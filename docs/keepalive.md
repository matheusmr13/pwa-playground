# Keepalive

## The test

In keepalive menu:

- Start a test
- Device will start a polling
- Service worker will be notified and start a polling as well
- Close app
- Server will send a push to client if it does not send a event in 1 minute
- Server will save an
