import React from 'react';
import { ReactChildren, ReactChild } from 'react';
import { Drawer, Layout } from 'antd';
import { isMobile } from 'react-device-detect';

const { Sider } = Layout;

function MenuLayout(props: { children: ReactChildren | ReactChild; open: boolean; onClose: Function }) {
  const { children, open, onClose } = props;
  if (isMobile) {
    return (
      <Drawer title="PWA Playground" placement="left" closable={true} visible={open} onClose={() => onClose()}>
        {children}
      </Drawer>
    );
  }

  return (
    <Sider collapsible trigger={null} collapsed={!open}>
      {children}
    </Sider>
  );
}

export default MenuLayout;
