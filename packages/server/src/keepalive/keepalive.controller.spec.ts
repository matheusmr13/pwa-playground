import { Test, TestingModule } from '@nestjs/testing';
import { KeepaliveController } from './keepalive.controller';

describe('KeepaliveController', () => {
  let controller: KeepaliveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeepaliveController],
    }).compile();

    controller = module.get<KeepaliveController>(KeepaliveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
