import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Tag, Empty, Space, Form, Input, InputNumber } from 'antd';
import PushNotificationService from './service';
import { useAppTitle } from '../../app/context';

import Page from '../../base/components/page';

export interface IPushNotificationProps {}

const PERMISSION_COLOR = {
  granted: 'success',
  denied: 'error',
  default: 'default',
} as any;

{
  /* <Card title="Status">
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
      </Card> */
}
export default function PushNotification() {
  const [permission, setPermission] = useState(Notification.permission as string);
  const [title, setTitle] = useAppTitle();

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
          page: <Tag color={PERMISSION_COLOR[permission]}>permission {permission}</Tag>,
        },
        {
          title: 'Actions',
          page: (
            <Button disabled={permission !== 'default'} onClick={askForPermission}>
              Ask for permission
            </Button>
          ),
        },
        {
          title: 'Schedule',
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

// export default function PushNotification(props: IPushNotificationProps) {
//   const isBrowserSupported = ;
//   return (
//     <PageHeader ghost={false} onBack={() => window.history.back()} title="Push notification">
//       {isBrowserSupported ? (
//         <PushNotificationActions />
//       ) : (
//         <Empty description="Your browser does not support push notifications" />
//       )}
//     </PageHeader>
//   );
// }
