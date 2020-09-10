import React, { useEffect, ReactChildren, ReactChild, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppTitle } from '../../app/context';
import { Card, PageHeader, Space, Empty } from 'antd';

interface IPageItem {
  title: string;
  page: ReactChildren | ReactChild;
}

export interface IPageProps {
  title: string;
  isSupported: boolean;
  items: IPageItem[];
}

export default function Page(props: IPageProps) {
  const { title, isSupported, items } = props;
  const [, setTitle] = useAppTitle();
  const [selectedMenu, setSelectedMenu] = useState(items[0]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  if (isMobile) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PageHeader title={selectedMenu.title} ghost={false} style={{ flex: 'auto' }}>
          {selectedMenu.page}
        </PageHeader>
        <div style={{ display: 'flex', borderTop: '1px solid #ccc', justifyContent: 'stretch', alignItems: 'stretch' }}>
          {items.map((item, i) => (
            <button
              style={{
                backgroundColor: '#fff',
                border: 'none',
                flex: '1 1 0px',
                padding: '8px 0',
                fontWeight: item === selectedMenu ? 'bold' : undefined,
                borderTop: item === selectedMenu ? '2px solid #ea1d2c' : '0',
                outline: 'none',
              }}
              key={i}
              onClick={() => setSelectedMenu(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageHeader ghost={false} onBack={() => window.history.back()} title={title}>
      {isSupported ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          {items.map((item) => (
            <Card title={item.title}>{item.page}</Card>
          ))}
        </Space>
      ) : (
        <Empty description="Your browser does not support this feature" />
      )}
    </PageHeader>
  );
}
