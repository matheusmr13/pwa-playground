import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KeepaliveService } from './keepalive.service';

@Controller('keepalive')
export class KeepaliveController {
  constructor(private readonly keepaliveService: KeepaliveService) {}

  @Get('/')
  listDevices() {
    return this.keepaliveService.listDevices();
  }

  @Post('/')
  createDevice(@Body() body: any) {
    const { subscription } = body;
    return this.keepaliveService.createDevice(subscription);
  }

  @Get('/:id')
  getDevice(@Param('id') id) {
    return this.keepaliveService.getDevice(id);
  }

  @Post('/:id/testcase/start')
  startTestCase(@Param('id') deviceId) {
    return this.keepaliveService.startTestCase(deviceId);
  }

  @Post('/:id/testcase/stop')
  stopTestCase(@Param('id') deviceId) {
    return this.keepaliveService.stopTestCase(deviceId);
  }

  @Post('/:id/testcase/event')
  eventTestCase(@Param('id') deviceId, @Body() body: any) {
    return this.keepaliveService.createEvent(deviceId, body);
  }

  @Get('/:deviceId/testcase/:id')
  getTestCase(@Param('deviceId') deviceId, @Param('id') testCaseId) {
    return this.keepaliveService.getTestCase(deviceId, testCaseId);
  }
}
