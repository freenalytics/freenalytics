import React, { useState } from 'react';
import { Menu } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../hooks/locale';
import { SidebarProps } from './types';

const MobileSidebar: React.FC<SidebarProps> = ({ active, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useLocale();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? 'sidebar-open' : ''}>
      <Menu className="application-sidebar-mobile">
        <Menu.List>
          <Menu.List.Item onClick={handleToggle}>
            <FontAwesomeIcon size="2x" icon="arrow-left" />
          </Menu.List.Item>

          <Menu.List.Item active={active === 'dashboard'}>
            <FontAwesomeIcon className="svg-icon" icon="house" />
            {t('common.application_sidebar.items.dashboard.text')}
          </Menu.List.Item>

          <Menu.List.Item active={active === 'settings'}>
            <FontAwesomeIcon className="svg-icon" icon="wrench" />
            {t('common.application_sidebar.items.settings.text')}
          </Menu.List.Item>
        </Menu.List>
      </Menu>

      <div className="sidebar-toggle">
        <FontAwesomeIcon className="svg-icon" size="1x" icon="arrow-right" onClick={handleToggle} />
      </div>

      {children}
    </div>
  );
};

export default MobileSidebar;
