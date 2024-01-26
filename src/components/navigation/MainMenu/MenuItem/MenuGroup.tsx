import React, { useState } from 'react';
import { Collapse } from 'antd';
import { IMenuItemData } from 'vars/types/menu.types';
import { SMenuCollapsible, SMenuGroupContainer } from 'components/navigation/MainMenu/DrawerMenu.styles';
import { MenuItem } from './MenuItem';

interface IMenuGroup {
  title: string;
  icon: string;
  items: IMenuItemData[];
}

const { Panel } = Collapse;

export const MenuGroup: React.FC<IMenuGroup> = ({ title, icon, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (expanded: string | string[]) => {
    setIsExpanded(expanded.includes(title));
  };

  return (
    <SMenuCollapsible ghost onChange={handleToggle}>
      <Panel header={<MenuItem title={title} icon={icon} arrowIcon={isExpanded ? 'chevronDown' : 'chevronRight'} />} showArrow={false} key={title}>
        <SMenuGroupContainer>
          {items.map((item) => (
            <MenuItem title={item.text} icon={item.icon} path={item.path} />
          ))}
        </SMenuGroupContainer>
      </Panel>
    </SMenuCollapsible>
  );
};
