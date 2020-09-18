import React, { useState, useEffect } from 'react';
import { Button, Space, Switch, Tag } from 'antd';
import KeepaliveService from './service';
import service from '../../base/service';

import Page from '../../base/components/page';
import {
  ApiFilled,
  ApiOutlined,
  ExperimentFilled,
  ExperimentOutlined,
  SaveFilled,
  SaveOutlined,
} from '@ant-design/icons';

import useAxios from 'axios-hooks';

import TestCasePage from './test-case';
import History from './history';

import { Device } from './model';
import { isMobile } from 'react-device-detect';

export interface IKeepaliveProps {}

function Keepalive() {
  const [{ data: device, loading, error }, refetch] = useAxios<Device>(
    service.mountUrl(`/keepalive/${KeepaliveService.deviceId}`)
  );

  const onToggleTest = async () => {
    const shouldStart = !device.actualTestCase;
    if (shouldStart) {
      await KeepaliveService.startPolling();
    } else {
      await KeepaliveService.stopPolling();
    }
    refetch();
  };

  useEffect(() => {
    if (!device || !device.actualTestCase) return;

    const refreshInterval = setInterval(() => {
      refetch();
    }, 5000);
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [device, refetch]);

  const handlePollingOnPushChange = (active: boolean) => {
    KeepaliveService.setPollingOnPush(active);
  };

  if (error) {
    if (error.response?.status !== 500) {
      return <>error</>;
    }

    KeepaliveService.registerDevice().then(() => {
      refetch();
    });
  }

  if (device) {
    return (
      <Page
        isSupported={'serviceWorker' in navigator}
        title="Keepalive"
        items={[
          {
            title: 'Test',
            getIcon: (selected: boolean) => (selected ? <ExperimentFilled /> : <ExperimentOutlined />),
            page: (
              <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                  <Button onClick={onToggleTest}>{device.actualTestCase ? 'Stop test' : 'Start test'}</Button>
                  <div>
                    Polling on push
                    <Switch
                      defaultChecked={KeepaliveService.initialPollingOnPush}
                      onChange={handlePollingOnPushChange}
                    />
                  </div>
                </Space>
                <Tag color="cyan">DeviceId: {device.id}</Tag>
                <Tag color="gold">Test cases: {Object.keys(device.testCases || {}).length}</Tag>
                {device.actualTestCase && <Tag color="gold">Current test case: {device.actualTestCase.id}</Tag>}
              </Space>
            ),
          },
          {
            title: 'Current Test',
            getIcon: (selected: boolean) => (selected ? <ApiFilled /> : <ApiOutlined />),
            page: <TestCasePage testCase={device.actualTestCase} running />,
          },
          {
            title: 'History',
            getIcon: (selected: boolean) => (selected ? <SaveFilled /> : <SaveOutlined />),
            page: <History device={device} />,
          },
        ]}
      />
    );
  }

  return <>Loading</>;
}

export default function KeepaliveWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    KeepaliveService.ready.then(() => {
      setReady(true);
    });
  }, [setReady]);

  if (!ready) return <>Waiting service worker initialize!</>;
  return <Keepalive />;
}
