import React, { useState, useMemo } from 'react';
import { Empty, Select, Space, Tag, Timeline } from 'antd';

import { TestCase } from './model';
import DateUtils from '../../base/date-utils';

export interface ITestCaseProps {
  testCase: TestCase;
  running?: boolean;
}

const { Option } = Select;

class GROUP_BY_INSTANCE {
  constructor(public key: string, public label: string, public time: number) {}
}

const GROUP_BY = {
  FIVE_MINUTES: new GROUP_BY_INSTANCE('FIVE_MINUTES', '5 minutes', 1000 * 60 * 5),
  MINUTE: new GROUP_BY_INSTANCE('MINUTE', 'minute', 1000 * 60),
  THIRTY_SECONDS: new GROUP_BY_INSTANCE('THIRTY_SECONDS', '30 seconds', 1000 * 30),
  FIFTEEN_SECONDS: new GROUP_BY_INSTANCE('FIFTEEN_SECONDS', '15 seconds', 1000 * 15),
};

function TestCasePage(props: ITestCaseProps) {
  const { testCase, running } = props;
  const [groupBy, setGroupBy] = useState(GROUP_BY.MINUTE);

  const groupedConnection = useMemo(() => {
    if (!testCase) return [];

    const grouped = testCase.events.reduce((agg: any, connection: any) => {
      const groupDateTime = Math.floor(new Date(connection.createdAt).getTime() / groupBy.time);
      agg[groupDateTime] = agg[groupDateTime] || [];
      agg[groupDateTime].push(connection);
      return agg;
    }, {});

    return Object.keys(grouped)
      .sort()
      .map((groupKey) => ({
        date: new Date(parseInt(groupKey, 10) * groupBy.time),
        list: grouped[groupKey],
      }));
  }, [testCase, groupBy]);

  if (!testCase) return <Empty description="Test is not running" />;

  return (
    <div style={{ textAlign: 'center' }}>
      <Space style={{ margin: '18px 0' }}>
        Group by
        <Select defaultValue={GROUP_BY.MINUTE.key} onChange={(key) => setGroupBy((GROUP_BY as any)[key])}>
          {Object.values(GROUP_BY).map((groupBy) => (
            <Option key={groupBy.key} value={groupBy.key}>
              {groupBy.label}
            </Option>
          ))}
        </Select>
      </Space>
      <div>
        <Timeline mode="left" reverse pending={running ? 'Test running...' : undefined}>
          {groupedConnection.map((grouped: any, i: number) => (
            <Timeline.Item key={i} label={DateUtils.formatDatetimeStr(grouped.date)}>
              {grouped.list.map((connection: any, i: number) => (
                <Tag key={i}>
                  {connection.origin} - {connection.type}
                </Tag>
              ))}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default TestCasePage;
