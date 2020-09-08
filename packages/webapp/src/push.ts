
export function askNotificationPermission () {
  Notification.requestPermission().then(function(permission) {
    console.info(permission)
  });
}

function urlBase64ToUint8Array(base64String: string) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const { REACT_APP_VAPID_PUBLIC_KEY } = process.env;

console.info({REACT_APP_VAPID_PUBLIC_KEY})

export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          REACT_APP_VAPID_PUBLIC_KEY!
        )
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);

        const body = JSON.stringify(sub);

        fetch('http://localhost:8080/sendPush', {
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          body
        }).then((a) => console.info(a));


      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}