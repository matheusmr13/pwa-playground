function urlBase64ToUint8Array(base64String: string) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const { REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_BASE_URL } = process.env;

class PushNotficationService {
  subscription: any;
  constructor() {
    this.subscription = JSON.parse(localStorage.getItem('subscription') || 'null');
  }

  async requestPermission(): Promise<string> {
    return new Promise((resolve) => {
      Notification.requestPermission(function (permission) {
        resolve(permission);
      });
    });
  }

  async subscribeToReceivePushs() {
    const registration = await navigator.serviceWorker.ready;
    console.info(registration);
    this.subscription = await new Promise((resolve) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(REACT_APP_VAPID_PUBLIC_KEY!),
        })
        .then(resolve);
    });
    console.info('depois', JSON.stringify(this.subscription));

    localStorage.setItem('subscription', JSON.stringify(this.subscription));
  }

  async sendPush(push: any) {
    if (!this.subscription) await this.subscribeToReceivePushs();

    const body = JSON.stringify({
      subscription: this.subscription,
      pushBody: push,
    });
    await fetch(`${REACT_APP_BASE_URL}/push-notifications/schedule`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body,
    });
  }
}

export default new PushNotficationService();
