import { Module } from '@nestjs/common';
import { PushNotificationsModule } from 'src/push-notifications/push-notifications.module';
import { KeepaliveController } from './keepalive.controller';
import { KeepaliveService } from './keepalive.service';

@Module({
  providers: [KeepaliveService],
  controllers: [KeepaliveController],
  imports: [PushNotificationsModule],
})
export class KeepaliveModule {}
