import { Injectable, Scope } from '@nestjs/common';
import { PushNotificationsService } from 'src/push-notifications/push-notifications.service';
import Device from './device';
import { Event } from './test-case';

const STARTUP_DATE = new Date();
const TIME_TO_PUSH = 1000 * 60;
const TIME_TO_OFFLINE = 1000 * 60 * 2;
const deviceConnection: { [key: string]: Device } = {};

@Injectable({ scope: Scope.DEFAULT })
export class KeepaliveService {
  constructor(private readonly pushService: PushNotificationsService) {}

  cancelDevicePushSchedule(device: Device) {
    if (device.pushTaskName) {
      this.pushService.cancelTask(device.pushTaskName);
    }
  }
  scheduleDevicePush(device: Device) {
    device.pushTaskName = this.pushService.schedulePush(
      new Date(new Date().getTime() + TIME_TO_PUSH),
      device.pushSubscription,
      {
        type: 'keepalive',
      },
      () => {
        device.createEvent({
          type: 'push',
          origin: 'server',
        });
      },
    );
  }

  cancelDeviceOfflineSchedule(device: Device) {
    if (device.offlineTaskName) {
      this.pushService.cancelTask(device.offlineTaskName);
    }
  }
  scheduleDeviceOffline(device: Device) {
    device.offlineTaskName = this.pushService.scheduleTask(
      new Date(new Date().getTime() + TIME_TO_OFFLINE),
      () => {
        device.createEvent({
          type: 'offline',
          origin: 'server',
        });
      },
    );
  }

  getMetaInfo() {
    return {
      serviceStart: STARTUP_DATE.toISOString(),
    };
  }
  listDevices() {
    return Object.values(deviceConnection);
  }
  getDevice(id: any) {
    const device = deviceConnection[id];
    if (!device) throw new Error('Device not found');
    return device;
  }
  createDevice(pushSubscription: any) {
    const id = `${Math.ceil(Math.random() * 100000000)}`;
    const device = new Device(id, pushSubscription);
    deviceConnection[id] = device;
    return device;
  }

  startTestCase(deviceId: string) {
    const device = this.getDevice(deviceId);
    const testCase = device.startTestCase();
    return testCase;
  }

  getTestCase(deviceId: string, testCaseId: string) {
    const device = this.getDevice(deviceId);
    const testCase = device.testCases[testCaseId];
    if (!testCase) throw new Error('Test case not found');
    return testCase;
  }

  stopTestCase(deviceId: string) {
    const device = this.getDevice(deviceId);
    const testCase = device.stopTestCase();
    this.cancelDevicePushSchedule(device);
    this.cancelDeviceOfflineSchedule(device);
    return testCase;
  }

  createEvent(deviceId: string, event: Event) {
    const device = this.getDevice(deviceId);
    const newEvent = device.createEvent(event);

    this.cancelDeviceOfflineSchedule(device);
    this.scheduleDeviceOffline(device);

    this.cancelDevicePushSchedule(device);
    this.scheduleDevicePush(device);
    return newEvent;
  }
}
