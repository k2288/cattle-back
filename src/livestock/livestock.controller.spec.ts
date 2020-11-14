import { Test, TestingModule } from '@nestjs/testing';
import { LivestockController } from './livestock.controller';
import { LivestockService } from './livestock.service';

describe('LivestockController', () => {
  let controller: LivestockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestockController],
      providers: [LivestockService],
    }).compile();

    controller = module.get<LivestockController>(LivestockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
