import React, { ReactNode } from 'react';
import { Collapse } from 'antd';
import { SCollapseWrapper, SExpandIcon } from './CustomCollapse.styles';

export interface ICustomPanelProps {
  children: ReactNode;
  handlePanelChange?: (key: string | string[]) => void;
  activeKey?: string;
}

export const CustomCollapse: React.FC<ICustomPanelProps> = ({ children, handlePanelChange, activeKey }) => (
  <SCollapseWrapper>
    <Collapse
      bordered={false}
      activeKey={activeKey}
      expandIcon={({ isActive }) => <SExpandIcon isActive={isActive} />}
      onChange={handlePanelChange}
      destroyInactivePanel
      accordion
      className="custom-collapse"
    >
      {children}
    </Collapse>
  </SCollapseWrapper>
);
