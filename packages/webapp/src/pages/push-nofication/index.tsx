import React, { useState } from 'react';
import { PageHeader, Card, Button, Tag, Empty, Space, Form, Input, InputNumber } from 'antd';
import PushNotificationService from './service';

export interface IPushNotificationProps {}

const PERMISSION_COLOR = {
  granted: 'success',
  denied: 'error',
  default: 'default',
} as any;

function PushNotificationActions() {
  const [permission, setPermission] = useState(Notification.permission as string);

  const askForPermission = async () => {
    const newPermission = await PushNotificationService.requestPermission();
    setPermission(newPermission);
  };

  const onSchedulePush = (values: any) => {
    PushNotificationService.sendPush(values);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Status">
        <Tag color={PERMISSION_COLOR[permission]}>permission {permission}</Tag>
      </Card>
      <Card title="Random actions">
        <Button disabled={permission !== 'default'} onClick={askForPermission}>
          Ask for permission
        </Button>
      </Card>
      <Card title="Schedule push">
        <Form initialValues={{ title: 'My cool title', secondsFromNow: 2 }} onFinish={onSchedulePush}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Seconds from now" name="secondsFromNow">
            <InputNumber />
          </Form.Item>
          <Button disabled={permission !== 'granted'} htmlType="submit">
            Schedule push
          </Button>
        </Form>
      </Card>
    </Space>
  );
}

export default function PushNotification(props: IPushNotificationProps) {
  const isBrowserSupported = 'Notification' in window && 'serviceWorker' in navigator;
  return (
    <PageHeader ghost={false} onBack={() => window.history.back()} title="Push notification">
      {isBrowserSupported ? (
        <PushNotificationActions />
      ) : (
        <Empty description="Your browser does not support push notifications" />
      )}
    </PageHeader>
  );
}
