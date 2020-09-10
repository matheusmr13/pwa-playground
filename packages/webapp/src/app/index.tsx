import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, useRouteMatch, useHistory, Route, Switch } from 'react-router-dom';
import { BellOutlined, DownloadOutlined, WifiOutlined, PrinterOutlined } from '@ant-design/icons';

import './App.less';

import MenuLayout from './menu-layout';
import Header from './header';

import ApplicationProvider, { useAppTitle } from './context';

import Installation from './../pages/installation';
import PushNotification from './../pages/push-nofication';
import Keepalive from './../pages/keep-alive';
import Printer from './../pages/printer';
import { isMobile } from 'react-device-detect';

const { Content, Footer } = Layout;

const items = [
  { label: 'Installation', icon: DownloadOutlined, rootComponent: Installation, url: 'installation' },
  { label: 'Push Notification', icon: BellOutlined, rootComponent: PushNotification, url: 'push-notification' },
  { label: 'Keepalive', icon: WifiOutlined, rootComponent: Keepalive, url: 'keepalive' },
  { label: 'Printer', icon: PrinterOutlined, rootComponent: Printer, url: 'printer' },
];

function App() {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    history.listen(() => {
      setOpen(false);
    });
  }, [history]);

  return (
    <ApplicationProvider>
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
    </ApplicationProvider>
  );
}

export default App;
