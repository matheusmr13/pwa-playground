import React from 'react';
import { Layout, Space } from 'antd';
import {
  BellOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useAppTitle } from './context';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const { Header: AntdHeader } = Layout;

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: Function;
}

const DEFAULT_TITLE = 'PWA Playground';

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
    <AntdHeader style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px 0 0' }}>
      <span
        onClick={() => (changeBehaviour ? handleBackButton() : onMenuToggle())}
        style={{ display: 'flex', alignItems: 'center', padding: '0 24px', cursor: 'pointer' }}
      >
        {getIcon()}
      </span>
      <div style={{ fontWeight: 'bold', color: '#fff', flex: 'auto', fontSize: '20px' }}>{titleToShow}</div>
      <Space size="middle">
        <a href="/push-notification" style={{ display: 'flex', alignItems: 'center' }}>
          <BellOutlined style={{ fontSize: '24px' }} />
        </a>
        <a href="https://web.dev/progressive-web-apps/" style={{ display: 'flex', alignItems: 'center' }}>
          <QuestionCircleOutlined style={{ fontSize: '24px' }} />
        </a>
      </Space>
    </AntdHeader>
  );
}

export default Header;
