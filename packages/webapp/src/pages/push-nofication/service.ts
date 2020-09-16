import Service from '../../base/service';

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
const { REACT_APP_VAPID_PUBLIC_KEY } = process.env;

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

    this.subscription = await new Promise((resolve) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(REACT_APP_VAPID_PUBLIC_KEY!),
        })
        .then(resolve);
    });

    localStorage.setItem('subscription', JSON.stringify(this.subscription));
  }

  async getSubscription() {
    if (!this.subscription) await this.subscribeToReceivePushs();
    return this.subscription;
  }

  async sendPush(push: any) {
    const subscription = await this.getSubscription();

    await Service.fetch(`/push-notifications/schedule`, {
      method: 'POST',
      data: {
        subscription,
        pushBody: push,
      },
    });
  }
}

export default new PushNotficationService();
