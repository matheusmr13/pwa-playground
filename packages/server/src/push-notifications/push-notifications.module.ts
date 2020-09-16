import { Module } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushNotificationsController } from './push-notifications.controller';
@Module({
  providers: [PushNotificationsService],
  controllers: [PushNotificationsController],
  exports: [PushNotificationsService],
})
export class PushNotificationsModule {}
