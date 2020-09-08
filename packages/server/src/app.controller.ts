import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/schedulePush')
  getHello(@Body() body: any): string {
    console.info(body);
    return this.appService.sendPush(body);
  }
}
