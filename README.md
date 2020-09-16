# :computer: :calling: PWA Playground

## :dart: Motivation

Learn and explore PWA capabilities to use in my projects!

## :memo: Architecture

We have a **webapp** to be our PWA page and as simple as possible **server** to help with some of this features.

### Webapp

- Created with [Create React App](https://create-react-app.dev/)
- Design by [Ant Design](https://ant.design/)
-

### Server

- Created with [Nestjs](https://nestjs.com/)

### Infra

- Bluetooth printer "MINI Thermal printer"

## :gift: Features

- [x] Installation
- [x] Push notifications
- [ ] Bluetooth (Printer || Beacon)
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

## :hammer: Development

To send push notifications, get your public and private keys using [this library](https://github.com/web-push-libs/web-push#command-line).

Create a file named `.env` with following content:

```bash
VAPID_PUBLIC_KEY='<PUBLIC_KEY>'
VAPID_PRIVATE_KEY='<PRIVATE_KEY'

REACT_APP_VAPID_PUBLIC_KEY='<PUBLIC_KEY>'
REACT_APP_BASE_URL=http://localhost:8080
```
