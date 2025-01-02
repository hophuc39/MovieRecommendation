import { Test, TestingModule } from '@nestjs/testing';
import { LlmsearchController } from './llmsearch.controller';

describe('LlmsearchController', () => {
  let controller: LlmsearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmsearchController],
    }).compile();

    controller = module.get<LlmsearchController>(LlmsearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
