import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

const webpush = require('web-push');

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

@Injectable()
export class PushNotificationsService {
  constructor(private scheduler: SchedulerRegistry) {}

  cancelTask(name: string) {
    try {
      this.scheduler.deleteCronJob(name);
    } catch (e) {
      console.info(`Cron ${name} not found!`);
    }
  }

  scheduleTask(when: Date, what: () => void) {
    const job = new CronJob(when, what);
    const name = `${Math.ceil(Math.random() * 1000000000)}`;
    this.scheduler.addCronJob(name, job);
    job.start();
    return name;
  }

  schedulePush(
    when: Date,
    subscription: any,
    pushBody: any,
    onTrigger?: () => void,
  ) {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY,
    );
    return this.scheduleTask(when, () => {
      if (onTrigger) onTrigger();
      webpush.sendNotification(subscription, JSON.stringify(pushBody));
    });
  }

  schedule(body) {
    const { subscription, pushBody } = body;
    const { secondsFromNow, ...push } = pushBody;
    this.schedulePush(
      new Date(Date.now() + secondsFromNow * 1000),
      subscription,
      {
        ...push,
        showNotification: true,
      },
    );
  }
}
