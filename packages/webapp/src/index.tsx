import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import KeepaliveService from './pages/keep-alive/service';

let resolver: any;
const onUpdate = new Promise<void>((resolve) => (resolver = resolve));

ReactDOM.render(
  <BrowserRouter>
    <App onUpdate={onUpdate} />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: () => {
    resolver();
  },
  onRegister: (registration) => {
    // registration.active!.postMessage!({
    //   type: 'START_POLLING',
    // });
    KeepaliveService.onSendMessage((message: any) => registration.active!.postMessage(message));
  },
});
