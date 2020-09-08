self.addEventListener('push', event => {
  console.info(event)
  const data = event.data.json();
  console.log('New asdnotification', data)

  // var text = 'HEY! Your task "' + title + '" is now overdue.';
  // var notification = new Notification(title || 'PWA Notification', { body: text, icon: img || `${process.env.PUBLIC_URL}/favicon.ico`);

  event.waitUntil(
    self.registration.showNotification(data.title, {
      icon: '/favicon.ico'
    })
  );
});

self.registration.pushManager.getSubscription().then(function(sub) {
  console.info('aque');
  if (sub === null) {
    subscribeUser()
    console.log('Not subscribed to push service!');
  } else {
    // We have a subscription, update the database
    console.log('Subscription object: ', sub);
  }
}).catch(a => console.info('deu ruim', e ));
