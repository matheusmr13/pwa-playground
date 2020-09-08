# PWA Playground

Features that I will explore:

- [x] Installation
- [x] Push notifications
- [ ] Bluetooth (Printer && Beacon)
- [ ] Updating
- [ ] TWA + Store
- [ ] Push (wake app to confirm connectivity)
- [ ] Camera API (QrCode scanner)
- [ ] File system API (write and read files)
- [ ] GPS (?)
- [ ] Acceleration (?)
- [ ] Deeplink
- [ ] Splash screen
- [ ] NFC

To send push notifications, get your public and private keys using [this library](https://github.com/web-push-libs/web-push#command-line).

Create a file named `.env` with following content:

```bash
VAPID_PUBLIC_KEY='<PUBLIC_KEY>'
VAPID_PRIVATE_KEY='<PRIVATE_KEY'

REACT_APP_VAPID_PUBLIC_KEY='<PUBLIC_KEY>'
REACT_APP_BASE_URL=http://localhost:8080
```
