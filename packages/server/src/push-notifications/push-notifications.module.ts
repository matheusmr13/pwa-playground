import { Module } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushNotificationsController } from './push-notifications.controller';

@Module({
  providers: [PushNotificationsService],
  controllers: [PushNotificationsController]
})
export class PushNotificationsModule {}
