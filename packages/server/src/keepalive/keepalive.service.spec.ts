import { Test, TestingModule } from '@nestjs/testing';
import { KeepaliveService } from './keepalive.service';

describe('KeepaliveService', () => {
  let service: KeepaliveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeepaliveService],
    }).compile();

    service = module.get<KeepaliveService>(KeepaliveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
