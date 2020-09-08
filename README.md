# PWA poc

Simple poc to demonstrate PWA powers

To send push notifications, get your public and private keys using [this library](https://github.com/web-push-libs/web-push#command-line).

Create a file named `.env` with following content:

```bash
VAPID_PUBLIC_KEY='<PUBLIC_KEY>';
VAPID_PRIVATE_KEY='<PRIVATE_KEY';

REACT_APP_VAPID_PUBLIC_KEY='<PUBLIC_KEY>'
REACT_APP_BASE_URL=http://localhost:8080
```
