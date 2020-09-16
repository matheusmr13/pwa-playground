import React, { useState, useEffect } from 'react';
import { Button, Tag, Form, Input, InputNumber } from 'antd';
import PushNotificationService from './service';
import { useAppTitle } from '../../app/context';

import Page from '../../base/components/page';
import {
  TagsOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  TagsFilled,
  ThunderboltFilled,
  ClockCircleFilled,
} from '@ant-design/icons';

export interface IPushNotificationProps {}

const PERMISSION_COLOR = {
  granted: 'success',
  denied: 'error',
  default: 'default',
} as any;

export default function PushNotification() {
  const [permission, setPermission] = useState(Notification.permission as string);
  const [, setTitle] = useAppTitle();

  useEffect(() => {
    setTitle('Push notification');
  }, []);
  const askForPermission = async () => {
    const newPermission = await PushNotificationService.requestPermission();
    setPermission(newPermission);
  };

  const onSchedulePush = (values: any) => {
    PushNotificationService.sendPush(values);
  };

  return (
    <Page
      isSupported={'Notification' in window && 'serviceWorker' in navigator}
      title="Push notification"
      items={[
        {
          title: 'Status',
          getIcon: (selected: boolean) => (selected ? <TagsFilled /> : <TagsOutlined />),
          page: <Tag color={PERMISSION_COLOR[permission]}>permission {permission}</Tag>,
        },
        {
          title: 'Actions',
          getIcon: (selected: boolean) => (selected ? <ThunderboltFilled /> : <ThunderboltOutlined />),
          page: (
            <Button disabled={permission !== 'default'} onClick={askForPermission}>
              Ask for permission
            </Button>
          ),
        },
        {
          title: 'Schedule',
          getIcon: (selected: boolean) => (selected ? <ClockCircleFilled /> : <ClockCircleOutlined />),
          page: (
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
          ),
        },
      ]}
    />
  );
}
