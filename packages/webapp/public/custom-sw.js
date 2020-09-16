importScripts('/idb-key-val.js');

const { get, set } = this.idbKeyval;

const BASE_URL = this.location.hostname === 'localhost' ? 'http://localhost:8080' : '';
class Storage {
  static KEYS = {
    POLLING_STATUS: 'POLLING_STATUS',
    POLLING_ON_PUSH: 'POLLING_ON_PUSH',
    DEVICE_ID: 'DEVICE_ID',
  };

  static pollingStatus;
  static async updatePollingStatus() {
    this.pollingStatus = await get(this.KEYS.POLLING_STATUS);
  }
  static isPollingStarted = () => this.pollingStatus === 'START';
  static getDeviceId() {
    return get(this.KEYS.DEVICE_ID);
  }
  static getPollingOnPush() {
    return get(this.KEYS.POLLING_ON_PUSH);
  }
}

class Event {
  static async send(eventProps) {
    try {
      const deviceId = await Storage.getDeviceId();
      const resp = await fetch(`${BASE_URL}/keepalive/${deviceId}/testcase/event`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(eventProps),
      });

      console.info(`SW polling ${resp.status}`);
    } catch (e) {
      console.info('SW polling error', e);
    }
  }

  static onReceivePush = async (event) => {
    const data = event.data.json();

    const shouldPollingOnPush = await Storage.getPollingOnPush();
    if (shouldPollingOnPush) {
      await Event.send({
        type: 'push',
        meta: data,
        origin: 'service-worker',
      });
    }

    if (data.showNotification) {
      event.waitUntil(
        this.registration.showNotification(data.title, {
          icon: '/favicon.ico',
        })
      );
    }
  };

  static onReceiveMessage = async (event) => {
    if (event.data && event.data.type === 'ON_STORAGE_CHANGE') {
      console.info('SW message ON_STORAGE_CHANGE');
      await Storage.updatePollingStatus();
      return;
    }
    console.info('SW message unrecognized', event.data);
  };
}

let pollingTimeout;
const doPolling = async () => {
  clearInterval(pollingTimeout);
  if (Storage.isPollingStarted()) {
    await Event.send({
      type: 'polling',
      origin: 'service-worker',
    });
  }
  pollingTimeout = setTimeout(doPolling, 30000);
};

const setup = async () => {
  await Storage.updatePollingStatus();
  // await doPolling();
};

this.addEventListener('message', Event.onReceiveMessage);
this.addEventListener('push', Event.onReceivePush);
setup();
