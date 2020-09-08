import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';

@Controller('push-notifications')
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationService: PushNotificationsService,
  ) {}
  @Post('/schedule')
  getHello(@Body() body: any): string {
    console.info(body);
    this.pushNotificationService.schedule(body);
    return 'show';
  }
}
