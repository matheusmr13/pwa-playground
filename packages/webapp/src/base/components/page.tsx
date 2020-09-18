import React, { useEffect, ReactChildren, ReactChild, useState, Children } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppTitle } from '../../app/context';
import { Card, PageHeader, Space, Empty } from 'antd';

interface IPageItem {
  title: string;
  getIcon: Function;
  page: ReactChildren | ReactChild;
}

export interface IPageProps {
  title: string;
  isSupported?: boolean;
  items?: IPageItem[];
  children?: ReactChild;
}

export default function Page(props: IPageProps) {
  const { title, isSupported = true, items = [], children } = props;
  const [, setTitle] = useAppTitle();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const selectedMenu = items[selectedMenuIndex];
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  if (children) {
    return (
      <PageHeader ghost={false} title={title}>
        {children}
      </PageHeader>
    );
  }

  const handleMenuClick = (index: number) => {
    setSelectedMenuIndex(index);
  };

  if (isMobile) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PageHeader
          title={selectedMenu.title}
          ghost={false}
          style={{ flex: 'auto', overflowY: 'auto', overflowX: 'hidden' }}
        >
          {selectedMenu.page}
        </PageHeader>
        <div style={{ display: 'flex', borderTop: '1px solid #ccc', justifyContent: 'stretch', alignItems: 'stretch' }}>
          {items.map((item, i) => (
            <button
              style={{
                backgroundColor: '#fff',
                border: 'none',
                flex: '1 1 0px',
                padding: '12px 0',
                paddingTop: item === selectedMenu ? '10px' : '12px',
                fontWeight: item === selectedMenu ? 'bold' : undefined,
                borderTop: item === selectedMenu ? '2px solid #ea1d2c' : '0',
                outline: 'none',
              }}
              key={i}
              onClick={() => handleMenuClick(i)}
            >
              <div>{item.getIcon(item === selectedMenu)}</div>
              <div>{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageHeader ghost={false} title={title}>
      {isSupported ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          {items.map((item, i) => (
            <Card key={i} title={item.title}>
              {item.page}
            </Card>
          ))}
        </Space>
      ) : (
        <Empty description="Your browser does not support this feature" />
      )}
    </PageHeader>
  );
}
