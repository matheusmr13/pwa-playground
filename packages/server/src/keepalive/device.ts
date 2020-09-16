import TestCase, { Event } from './test-case';

export default class Device {
  testCases: { [key: string]: TestCase } = {};
  actualTestCase: TestCase;
  pushTaskName?: string;
  offlineTaskName?: string;
  createdAt: Date;

  constructor(public id: string, public pushSubscription: any) {
    this.createdAt = new Date();
  }

  startTestCase() {
    const testCase = new TestCase();
    testCase.registerStart();

    this.testCases[testCase.id] = testCase;
    this.actualTestCase = testCase;

    return testCase;
  }

  stopTestCase() {
    const actualTestCase = this.actualTestCase;

    this.actualTestCase.registerEnd();
    this.actualTestCase = null;

    return actualTestCase;
  }

  createEvent(event: Event) {
    if (!this.actualTestCase) throw new Error('Test case is not running');
    this.actualTestCase.registerEvent(event);
  }
}
