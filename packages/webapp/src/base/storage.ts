import { get, set, clear } from 'idb-keyval';

export enum POLLING_STATUS {
  START = 'START',
  STOP = 'STOP',
}

export enum STORAGE {
  POLLING_STATUS = 'POLLING_STATUS',
  POLLING_ON_PUSH = 'POLLING_ON_PUSH',
  DEVICE_ID = 'DEVICE_ID',
}

class SharedStorage {
  getPollingStatus = (): Promise<POLLING_STATUS> => get(STORAGE.POLLING_STATUS);
  setPollingStatus = (status: POLLING_STATUS): Promise<void> => set(STORAGE.POLLING_STATUS, status);

  getDeviceId = (): Promise<string> => get(STORAGE.DEVICE_ID);
  setDeviceId = (deviceId: string): Promise<void> => set(STORAGE.DEVICE_ID, deviceId);

  getPollingOnPush = (): Promise<boolean> => get(STORAGE.POLLING_ON_PUSH);
  setPollingOnPush = (pollingOnPush: boolean): Promise<void> => set(STORAGE.POLLING_ON_PUSH, pollingOnPush);

  clearAll = () => clear();
}

export default new SharedStorage();
