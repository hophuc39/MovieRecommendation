import { Test, TestingModule } from '@nestjs/testing';
import { LlmsearchService } from './llmsearch.service';

describe('LlmsearchService', () => {
  let service: LlmsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmsearchService],
    }).compile();

    service = module.get<LlmsearchService>(LlmsearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
