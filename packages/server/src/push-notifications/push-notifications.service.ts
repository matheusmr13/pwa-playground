import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

const webpush = require('web-push');

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

@Injectable()
export class PushNotificationsService {
  constructor(private scheduler: SchedulerRegistry) {}

  schedule(body) {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY,
    );
    const { subscription, pushBody } = body;
    const job = new CronJob(
      new Date(Date.now() + pushBody.secondsFromNow * 1000),
      () => {
        webpush.sendNotification(subscription, JSON.stringify(pushBody));
      },
    );

    this.scheduler.addCronJob(
      `${Math.ceil(Math.random() * 1000000)}-push-notification`,
      job,
    );
    job.start();
  }
}
