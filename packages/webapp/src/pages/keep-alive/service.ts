import service from '../../base/service';
import PushNotficationService from '../push-nofication/service';
import Storage from '../../base/storage';

let sendMessage: Function = () => {
  throw new Error('Wait');
};
let resolver: Function;

enum POLLING_STATUS {
  START = 'START',
  STOP = 'STOP',
}

class KeepaliveService {
  ready = new Promise((resolve) => (resolver = resolve));
  initialState?: POLLING_STATUS;
  deviceId?: string;
  pollingTimeout?: any;
  initialPollingOnPush?: boolean;

  sendEvent = async (eventProps: any) => {
    try {
      const resp = await service.fetch(`/keepalive/${this.deviceId}/testcase/event`, {
        method: 'POST',
        data: eventProps,
      });

      console.info(`DOM polling ${resp?.status}`);
    } catch (e) {
      console.info('DOM polling error', e);
    }
  };

  registerDevice = async () => {
    const subscription = await PushNotficationService.getSubscription();
    const response = await service.fetch(`/keepalive`, {
      method: 'POST',
      data: {
        subscription,
      },
    });
    const data = await response?.json();

    this.deviceId = data.id;

    await Storage.setDeviceId(this.deviceId!);
  };

  onSendMessage = async (callback: Function) => {
    sendMessage = callback;
    this.deviceId = await Storage.getDeviceId();
    if (!this.deviceId) {
      await this.registerDevice();
    }

    this.initialState = await Storage.getPollingStatus();
    if (this.initialState === POLLING_STATUS.START) {
      this.doPolling();
    }

    this.initialPollingOnPush = await Storage.getPollingOnPush();

    resolver();
  };

  doPolling = async () => {
    await this.sendEvent({
      type: 'polling',
      origin: 'dom',
    });
    this.pollingTimeout = setTimeout(this.doPolling, 30000);
  };

  startPolling = async () => {
    await service.fetch(`/keepalive/${this.deviceId}/testcase/start`, {
      method: 'POST',
    });

    this.doPolling();
    await Storage.setPollingStatus(POLLING_STATUS.START);
    sendMessage({ type: 'ON_STORAGE_CHANGE' });
  };

  stopPolling = async () => {
    clearInterval(this.pollingTimeout);
    await Storage.setPollingStatus(POLLING_STATUS.STOP);
    sendMessage({ type: 'ON_STORAGE_CHANGE' });

    await service.fetch(`/keepalive/${this.deviceId}/testcase/stop`, {
      method: 'POST',
    });
  };

  setPollingOnPush = Storage.setPollingOnPush;
}

export default new KeepaliveService();
