#!/usr/bin/env bash
# Contract / smoke matrix for every OpenAPI /v1 route (+ GET /).
# Prerequisites: Nest on BASE_URL, Mongo with .env credentials.
# Usage:
#   ./scripts/smoke-v1.sh
#   BASE_URL=http://127.0.0.1:3001 ./scripts/smoke-v1.sh
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3001}"
MONGO_BIN="${MONGO_BIN:-/opt/homebrew/opt/mongodb-community@4.4/bin/mongo}"
PHONE="${SMOKE_PHONE:-+989121234567}"
TAG="SMOKE-$(date +%s)"
PASS=0
FAIL=0
LOG=/tmp/smoke-v1-results.txt
: >"$LOG"

# Accept one or more HTTP codes (space-separated).
req() {
  local name="$1" method="$2" path="$3" wants="$4"
  local body="${5:-}"
  local auth="${6:-}"
  local args=(-sS -o /tmp/smoke-body.json -w "%{http_code}" -X "$method")
  args+=(-H "Content-Type: application/json" -H "Accept: application/json")
  if [ -n "$auth" ]; then
    args+=(-H "Authorization: Bearer $auth")
  fi
  if [ -n "$body" ]; then
    args+=(-d "$body")
  fi
  local code
  code=$(curl "${args[@]}" "${BASE_URL}${path}" || echo "000")
  local ok=0
  local w
  for w in $wants; do
    if [ "$code" = "$w" ]; then ok=1; break; fi
  done
  local snippet
  snippet=$(python3 -c "t=open('/tmp/smoke-body.json').read(); print(t[:200].replace(chr(10),' '))" 2>/dev/null || true)
  if [ "$ok" -eq 1 ]; then
    PASS=$((PASS + 1))
    echo "OK   $code  $method $path  ($name)" | tee -a "$LOG"
  else
    FAIL=$((FAIL + 1))
    echo "FAIL want=[$wants] got=$code  $method $path  ($name)  body=$snippet" | tee -a "$LOG"
  fi
}

json_field() {
  python3 -c "import json,sys; d=json.load(sys.stdin); v=d.get(sys.argv[1]); print('' if v is None else v)" "$1" <"$2"
}

echo "== smoke-v1 against $BASE_URL =="

req "root unauth" GET "/" "401"

req "auth phone" POST "/v1/auth/phone" "200 201" "{\"phone\":\"$PHONE\"}"

OTP=$("$MONGO_BIN" --quiet \
  -u root -p password --authenticationDatabase admin \
  pin --eval 'db.authcodes.find().sort({_id:-1}).limit(1).forEach(function(d){print(d.code)})' 2>/dev/null | tr -d '[:space:]')
if [ -z "$OTP" ]; then
  echo "FATAL: could not read OTP from Mongo authcodes"
  exit 2
fi
echo "OTP from Mongo: $OTP"

req "auth code" POST "/v1/auth/code" "200 201" "{\"phone\":\"$PHONE\",\"code\":\"$OTP\"}"
TOKEN=$(json_field token /tmp/smoke-body.json)
if [ -z "$TOKEN" ]; then
  echo "FATAL: no token in login response: $(cat /tmp/smoke-body.json)"
  exit 2
fi
echo "Got bearer token (${#TOKEN} chars)"

req "users me" GET "/v1/users/me" "200" "" "$TOKEN"
req "settings" GET "/v1/settings" "200" "" "$TOKEN"
req "dashboard" GET "/v1/dashboard" "200" "" "$TOKEN"
req "livestock list" GET "/v1/livestock?offset=0&pageSize=10" "200" "" "$TOKEN"

LIVESTOCK_BODY="{\"tagNo\":\"$TAG\",\"birthDate\":\"2020-01-15\",\"gender\":\"cow\",\"mother\":\"m1\",\"inseminator\":\"i1\"}"
req "livestock create" POST "/v1/livestock" "200 201" "$LIVESTOCK_BODY" "$TOKEN"
LID=$(json_field _id /tmp/smoke-body.json)
if [ -z "$LID" ]; then
  echo "FATAL: no livestock _id: $(cat /tmp/smoke-body.json)"
  exit 2
fi
echo "Livestock id: $LID"

req "livestock get" GET "/v1/livestock/$LID" "200" "" "$TOKEN"
req "livestock put" PUT "/v1/livestock/$LID" "200" \
  "{\"tagNo\":\"$TAG-u\",\"birthDate\":\"2020-01-15\",\"gender\":\"cow\",\"mother\":\"m2\",\"inseminator\":\"i2\"}" \
  "$TOKEN"

STATE_BODY='{"state":"milked","date":"2024-06-01","description":"smoke"}'
req "state create" POST "/v1/livestock/$LID/state" "200 201" "$STATE_BODY" "$TOKEN"
SID=$(json_field _id /tmp/smoke-body.json)
echo "State id: ${SID:-none}"

req "state list" GET "/v1/livestock/$LID/state?offset=0&pageSize=10" "200" "" "$TOKEN"

if [ -n "$SID" ]; then
  req "state put" PUT "/v1/livestock/$LID/state/$SID" "200" \
    '{"state":"dry","date":"2024-06-02","description":"smoke-upd"}' "$TOKEN"
fi

req "milk put" PUT "/v1/livestock/$LID/milk" "200" \
  '{"date":"2024-06-03T00:00:00.000Z","amount":12.5}' "$TOKEN"

if [ -n "$SID" ]; then
  req "state delete" DELETE "/v1/livestock/$LID/state/$SID" "200" "" "$TOKEN"
fi
req "livestock delete" DELETE "/v1/livestock/$LID" "200" "" "$TOKEN"

echo
echo "== summary: $PASS passed, $FAIL failed =="
cat "$LOG"
if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
