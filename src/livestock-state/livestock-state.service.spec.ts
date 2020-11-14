import { Test, TestingModule } from '@nestjs/testing';
import { LivestockStateService } from './livestock-state.service';

describe('LivestockStateService', () => {
  let service: LivestockStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivestockStateService],
    }).compile();

    service = module.get<LivestockStateService>(LivestockStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
