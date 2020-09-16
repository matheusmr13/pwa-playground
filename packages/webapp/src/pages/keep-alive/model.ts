export interface Device {
  id: string;
  testCases: { [key: string]: TestCase };
  actualTestCase: TestCase;
  createdAt: string;
}

export interface Event {
  createdAt?: string;
  type: string;
  origin: string;
  meta?: any;
}

export interface TestCase {
  id: string;
  createdAt: string;
  events: Event[];
}
