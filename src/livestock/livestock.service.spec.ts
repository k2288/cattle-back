import { Test, TestingModule } from '@nestjs/testing';
import { LivestockService } from './livestock.service';

describe('LivestockService', () => {
  let service: LivestockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivestockService],
    }).compile();

    service = module.get<LivestockService>(LivestockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
