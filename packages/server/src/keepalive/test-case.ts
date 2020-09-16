export class Event {
  createdAt?: Date;
  type: string;
  origin: string;
  meta?: any;
}

export default class TestCase {
  id: string;
  createdAt: Date;
  events: Event[] = [];

  constructor() {
    this.id = `${Math.ceil(Math.random() * 10000)}`;
    this.createdAt = new Date();
  }

  registerEvent(event: Event) {
    event.createdAt = new Date();
    this.events.push(event);
  }

  registerEnd() {
    this.registerEvent({
      type: 'end',
      origin: 'server',
    });
  }

  registerStart() {
    this.registerEvent({
      type: 'start',
      origin: 'server',
    });
  }
}
