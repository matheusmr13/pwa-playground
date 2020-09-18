import React from 'react';
import Page from '../../base/components/page';
import { InfoCircleFilled, InfoCircleOutlined, ToolFilled, ToolOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Tag } from 'antd';
import { isMobile } from 'react-device-detect';
import storage from '../../base/storage';
import { UAParser } from 'ua-parser-js';

export interface IHomeProps {}

const { browser, device, os } = new UAParser().getResult();
const browseSupport = {
  'Offline cache': 'serviceWorker' in navigator,
  Push: 'serviceWorker' in navigator,
  'Push Notification': 'serviceWorker' in navigator && 'Notification' in window,
  Bluetooth: 'bluetooth' in navigator,
};

const applicationProps = {
  Installed: window.matchMedia('(display-mode: standalone)').matches,
};

const tagStyle = { marginRight: '8px', marginBottom: '8px' };

export default function Home(props: IHomeProps) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Row gutter={[24, 24]} style={{ padding: '24px' }}>
        <Col span={24}>
          <Card title="Application">
            <Space direction="vertical">
              <Space>
                <Tag>Version: {process.env.REACT_APP_VERSION}</Tag>
              </Space>
              <div>
                {Object.keys(applicationProps).map((permission) => (
                  <Tag
                    key={permission}
                    color={(applicationProps as any)[permission] ? 'green' : 'red'}
                    style={tagStyle}
                  >
                    {permission}
                  </Tag>
                ))}
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Device">
            <Tag style={tagStyle}>
              {os.name} {os.version}
            </Tag>
            {device.type && (
              <>
                <Tag style={tagStyle}>Device {device.type}</Tag>
                <Tag style={tagStyle}>
                  {device.vendor} {device.model}
                </Tag>
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Browser">
            <Space direction="vertical">
              <Tag>
                {browser.name} {browser.version}
              </Tag>
              <div>
                {Object.keys(browseSupport).map((permission) => (
                  <Tag
                    key={permission}
                    color={(browseSupport as any)[permission] ? 'green' : 'red'}
                    style={{ marginRight: '8px', marginBottom: '8px' }}
                  >
                    {permission}
                  </Tag>
                ))}
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
