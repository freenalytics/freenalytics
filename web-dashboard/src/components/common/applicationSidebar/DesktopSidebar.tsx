import React from 'react';
import { Columns, Menu } from 'react-bulma-components';
import SidebarItems from './SidebarItems';
import { SidebarProps } from './types';

const DesktopSidebar: React.FC<SidebarProps> = ({ active, domain, children }) => {
  return (
    <Columns className="application-sidebar-desktop">
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 3 }}
        desktop={{ size: 3 }}
        widescreen={{ size: 3 }}
        fullhd={{ size: 3 }}
      >
        <Menu>
          <Menu.List>
            <SidebarItems active={active} domain={domain} />
          </Menu.List>
        </Menu>
      </Columns.Column>

      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 9 }}
        desktop={{ size: 9 }}
        widescreen={{ size: 9 }}
        fullhd={{ size: 9 }}
      >
        <div className="application-content">
          {children}
        </div>
      </Columns.Column>
    </Columns>
  );
};

export default DesktopSidebar;
