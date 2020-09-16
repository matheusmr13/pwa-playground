import React from 'react';
import Page from '../../base/components/page';
import { InfoCircleFilled, InfoCircleOutlined, ToolFilled, ToolOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { isMobile } from 'react-device-detect';
import storage from '../../base/storage';

export interface ISettingProps {}

const handleResetDevice = async () => {
  await navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
    }
  });

  await storage.clearAll();
  localStorage.clear();
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

export default function Setting(props: ISettingProps) {
  return (
    <Page
      title="Setting"
      items={[
        {
          title: 'Tools',
          getIcon: (selected: boolean) => (selected ? <ToolFilled /> : <ToolOutlined />),
          page: (
            <Space direction={isMobile ? 'vertical' : 'horizontal'}>
              <Button onClick={handleResetDevice}>Reset device</Button>
            </Space>
          ),
        },
        {
          title: 'About',
          getIcon: (selected: boolean) => (selected ? <InfoCircleFilled /> : <InfoCircleOutlined />),
          page: (
            <Space direction={isMobile ? 'vertical' : 'horizontal'}>
              <Tag>Version {process.env.REACT_APP_VERSION}</Tag>
              <div>
                Icons made by{' '}
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                  Freepik
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </div>
            </Space>
          ),
        },
      ]}
    />
  );
}
