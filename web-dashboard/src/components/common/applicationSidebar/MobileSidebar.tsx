import React, { useState } from 'react';
import { Menu } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarItems from './SidebarItems';
import { SidebarProps } from './types';

const MobileSidebar: React.FC<SidebarProps> = ({ active, domain, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={`application-sidebar-mobile ${open ? 'sidebar-open' : ''}`}>
      <Menu className="sidebar-menu">
        <Menu.List>
          <Menu.List.Item onClick={handleToggle}>
            <FontAwesomeIcon size="2x" icon="arrow-left" />
          </Menu.List.Item>

          <SidebarItems active={active} domain={domain} />
        </Menu.List>
      </Menu>

      <div className="sidebar-toggle">
        <FontAwesomeIcon className="svg-icon" size="1x" icon="arrow-right" onClick={handleToggle} />
      </div>

      <div className="application-content">
        {children}
      </div>
    </div>
  );
};

export default MobileSidebar;
