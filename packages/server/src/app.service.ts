import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sendPush(body: any): string {
    return 'Hello World!';
  }
}
