import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';

import { join } from 'path';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { KeepaliveModule } from './keepalive/keepalive.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'webapp', 'build'),
    }),
    ScheduleModule.forRoot(),
    PushNotificationsModule,
    KeepaliveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'asd', method: RequestMethod.DELETE })
      .forRoutes();
  }
}
