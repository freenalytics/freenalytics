import React from 'react';
import { Menu } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../hooks/locale';
import { SidebarProps } from './types';

const DesktopSidebar: React.FC<SidebarProps> = ({ active, children }) => {
  const { t } = useLocale();

  return (
    <div className="application-sidebar">
      <Menu>
        <Menu.List>
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

      <div className="application-content">
        {children}
      </div>
    </div>
  );
};

export default DesktopSidebar;
