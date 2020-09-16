import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useHistory, Route, Switch } from 'react-router-dom';
import { DownloadOutlined, WifiOutlined, PrinterOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';

import './App.less';

import MenuLayout from './menu-layout';
import Header from './header';

import ApplicationProvider, { useNotifications } from './context';

import Installation from './../pages/installation';
import PushNotification from './../pages/push-nofication';
import Keepalive from './../pages/keep-alive';
import Printer from './../pages/printer';
import Setting from './../pages/setting';

import { isMobile } from 'react-device-detect';

const { Content, Footer } = Layout;

const items = [
  { label: 'Installation', icon: DownloadOutlined, rootComponent: Installation, url: 'installation' },
  { label: 'Push Notification', icon: SendOutlined, rootComponent: PushNotification, url: 'push-notification' },
  { label: 'Keepalive', icon: WifiOutlined, rootComponent: Keepalive, url: 'keepalive' },
  { label: 'Printer', icon: PrinterOutlined, rootComponent: Printer, url: 'printer' },
  { label: 'Setting', icon: SettingOutlined, rootComponent: Setting, url: 'settings' },
];

function App(props: { onUpdate: Promise<void> }) {
  const { onUpdate } = props;
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [, setNotifications] = useNotifications();

  useEffect(() => {
    history.listen(() => {
      setOpen(false);
    });
  }, [history]);

  useEffect(() => {
    onUpdate.then(() => {
      setNotifications([
        {
          title: 'Update available',
          action: {
            callback: () => {
              window.location.reload();
            },
            label: 'accept',
          },
        },
      ]);
    });
  }, []);
  useEffect(() => {
    if (isMobile) document.body.classList.add('isMobile');
  }, []);
  return (
    <Layout style={{ height: '100vh' }} className={isMobile ? 'isMobile' : 'isNotMobile'}>
      <Header isMenuOpen={isOpen} onMenuToggle={() => setOpen(!isOpen)} />
      <Layout>
        <MenuLayout open={isOpen} onClose={() => setOpen(false)}>
          <Menu selectedKeys={['0']} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.url} icon={<item.icon />}>
                <Link to={`/${item.url}`}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </MenuLayout>
        <Layout>
          <Content style={{ padding: '18px' }}>
            <Switch>
              {items.map((item) => (
                <Route key={item.url} exact path={`/${item.url}`}>
                  <item.rootComponent />
                </Route>
              ))}
              <Route path="/">Welcome to PWA playground</Route>
            </Switch>
          </Content>
          {!isMobile && (
            <Footer style={{ textAlign: 'center' }}>
              <a href="https://web.dev/progressive-web-apps/">PWA</a>
            </Footer>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
}

function AppWrapper(props: { onUpdate: Promise<void> }) {
  return (
    <ApplicationProvider>
      <App onUpdate={props.onUpdate} />
    </ApplicationProvider>
  );
}

export default AppWrapper;
