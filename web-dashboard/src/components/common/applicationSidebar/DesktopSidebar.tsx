import React from 'react';
import { Menu } from 'react-bulma-components';
import SidebarItems from './SidebarItems';
import { SidebarProps } from './types';

const DesktopSidebar: React.FC<SidebarProps> = ({ active, domain, children }) => {
  return (
    <div className="application-sidebar">
      <Menu>
        <Menu.List>
          <SidebarItems active={active} domain={domain} />
        </Menu.List>
      </Menu>

      <div className="application-content">
        {children}
      </div>
    </div>
  );
};

export default DesktopSidebar;
