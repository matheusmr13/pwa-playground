import React, { useMemo, useState } from 'react';
import { Button, Empty, Timeline } from 'antd';

import DateUtils from '../../base/date-utils';
import { Device, TestCase } from './model';
import TestCasePage from './test-case';

export interface IHistoryProps {
  device: Device;
}

function History(props: IHistoryProps) {
  const { device } = props;
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase>();

  const testCases = useMemo(() => {
    let testCasesList = Object.values(device.testCases);
    if (device.actualTestCase) {
      testCasesList = testCasesList.filter((testCase: TestCase) => device.actualTestCase.id !== testCase.id);
    }

    testCasesList = testCasesList.sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt));
    return testCasesList;
  }, [device]);

  if (testCases.length === 0) {
    return <Empty description="No test cases finished yet" />;
  }

  if (selectedTestCase) {
    return (
      <div>
        <Button onClick={() => setSelectedTestCase(undefined)}>Back to list</Button>
        <TestCasePage testCase={selectedTestCase} />
      </div>
    );
  }

  return (
    <div>
      <Timeline mode="left">
        {testCases.map((testCase: TestCase, i: number) => (
          <Timeline.Item key={i} label={DateUtils.formatDatetimeStr(testCase.createdAt)}>
            <Button onClick={() => setSelectedTestCase(testCase)}>{testCase.id}</Button>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}

export default History;
