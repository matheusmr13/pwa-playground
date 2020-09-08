import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { Link, useRouteMatch, useHistory, Route, Switch } from 'react-router-dom';
import {
  BellOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  CloudDownloadOutlined,
  DownloadOutlined,
  WifiOutlined,
  PrinterOutlined,
} from '@ant-design/icons';

import './App.less';

import Installation from './pages/installation';
import PushNotification from './pages/push-nofication';
import Keepalive from './pages/keep-alive';
import Printer from './pages/printer';

const { Sider, Header, Content, Footer } = Layout;
// <div className="App">
//   <button onClick={askNotificationPermission}>askNotificationPermission</button>
//   <button onClick={subscribeUser}>Subscribe to push</button>
// </div>

const items = [
  { label: 'Installation', icon: DownloadOutlined, rootComponent: Installation, url: 'installation' },
  { label: 'Push Notification', icon: BellOutlined, rootComponent: PushNotification, url: 'push-notification' },
  { label: 'Keepalive', icon: WifiOutlined, rootComponent: Keepalive, url: 'keepalive' },
  { label: 'Printer', icon: PrinterOutlined, rootComponent: Printer, url: 'printer' },
];

function App() {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible trigger={null} collapsed={false}>
        <Link to="/">
          <div style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/pwa.png" style={{ width: '100px' }} />
          </div>
        </Link>
        <Menu selectedKeys={['0']} theme="dark" mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.url} icon={<item.icon />}>
              <Link to={`/${item.url}`}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '18px' }}>
          <Space size="middle">
            <a href="/push-notification" style={{ display: 'flex', alignItems: 'center' }}>
              <BellOutlined style={{ fontSize: '24px' }} />
            </a>
            <a href="https://web.dev/progressive-web-apps/" style={{ display: 'flex', alignItems: 'center' }}>
              <QuestionCircleOutlined style={{ fontSize: '24px' }} />
            </a>
          </Space>
        </Header>
        <Content style={{ padding: '18px' }}>
          <Switch>
            {items.map((item) => (
              <Route key={item.url} exact path={`/${item.url}`}>
                <item.rootComponent />
              </Route>
            ))}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <a href="https://web.dev/progressive-web-apps/">PWA</a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
