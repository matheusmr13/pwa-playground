import React, { useState } from 'react';
import { Badge, Layout, Popover, Space, List } from 'antd';
import { BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAppTitle, useNotifications } from './context';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const { Header: AntdHeader } = Layout;

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: Function;
}

const DEFAULT_TITLE = 'PWA Playground';

function Notifications() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useNotifications();

  const handleActionClick = (callback: Function) => (e: any) => {
    e.preventDefault();
    callback();
  };

  return (
    <Badge
      count={notifications ? notifications.length : 0}
      style={{
        backgroundColor: '#fff',
        color: '#ea1d2c',
        fontWeight: 'bold',
        marginRight: '22px',
        marginTop: '22px',
      }}
    >
      <Popover
        content={
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(notification: any) => (
              <List.Item
                actions={[
                  <a onClick={handleActionClick(notification.action.callback)} href="#">
                    {notification.action.label}
                  </a>,
                ]}
              >
                {notification.title}
              </List.Item>
            )}
          />
        }
        title="Notifications"
        trigger="click"
        visible={isNotificationOpen}
        onVisibleChange={setNotificationOpen}
        placement="bottomRight"
      >
        <BellOutlined style={{ fontSize: '24px', padding: '22px' }} />
      </Popover>
    </Badge>
  );
}

function Header(props: HeaderProps) {
  const history = useHistory();
  const { isMenuOpen, onMenuToggle } = props;
  const [title, setTitle] = useAppTitle();

  const changeBehaviour = isMobile && title;
  const titleToShow = isMobile && title ? title : DEFAULT_TITLE;

  const handleBackButton = () => {
    setTitle(null);
    history.goBack();
  };

  const getIcon = () => {
    if (changeBehaviour) return <ArrowLeftOutlined />;
    if (isMenuOpen) return <MenuUnfoldOutlined />;
    return <MenuFoldOutlined />;
  };

  return (
    <AntdHeader style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
      <span
        onClick={() => (changeBehaviour ? handleBackButton() : onMenuToggle())}
        style={{ display: 'flex', alignItems: 'center', padding: '0 24px', cursor: 'pointer' }}
      >
        {getIcon()}
      </span>
      <div style={{ fontWeight: 'bold', color: '#fff', flex: 'auto', fontSize: '20px' }}>{titleToShow}</div>
      <Space size="middle">
        <Notifications />
      </Space>
    </AntdHeader>
  );
}

export default Header;
