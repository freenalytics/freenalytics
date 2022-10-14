import React from 'react';
import { Menu } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarProps } from './types';

const DesktopSidebar: React.FC<SidebarProps> = ({ active, children }) => {
  return (
    <div className="application-sidebar">
      <Menu>
        <Menu.List>
          <Menu.List.Item active={active === 'dashboard'}>
            <FontAwesomeIcon className="svg-icon" icon="house" />
            Dashboard UPDATE
          </Menu.List.Item>
          <Menu.List.Item active={active === 'settings'}>
            <FontAwesomeIcon className="svg-icon" icon="wrench" />
            Settings
          </Menu.List.Item>
        </Menu.List>
      </Menu>
      <div className="application-content">
        {children}
      </div>
    </div>
  );
};

export default DesktopSidebar;
