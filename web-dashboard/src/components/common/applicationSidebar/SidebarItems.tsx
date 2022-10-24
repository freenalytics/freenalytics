import React, { Fragment } from 'react';
import { Menu } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DYNAMIC_PROTECTED_ROUTES } from '../../../constants/routes';
import useLocale from '../../../hooks/locale';
import { SidebarActiveItem } from './types';

export interface Props {
  active: SidebarActiveItem
  domain: string
}

const SidebarItems: React.FC<Props> = ({ domain, active }) => {
  const { t } = useLocale();

  return (
    <Fragment>
      <Menu.List.Item renderAs={Link} to={DYNAMIC_PROTECTED_ROUTES.applicationDashboard(domain)} active={active === 'dashboard'}>
        <FontAwesomeIcon className="svg-icon" icon="house" />
        {t('common.application_sidebar.items.dashboard.text')}
      </Menu.List.Item>

      <Menu.List.Item renderAs={Link} to={DYNAMIC_PROTECTED_ROUTES.applicationEntryTable(domain)} active={active === 'entries'}>
        <FontAwesomeIcon className="svg-icon" icon="table-list" />
        {t('common.application_sidebar.items.entries.text')}
      </Menu.List.Item>

      <Menu.List.Item renderAs={Link} to={DYNAMIC_PROTECTED_ROUTES.applicationInformation(domain)} active={active === 'information'}>
        <FontAwesomeIcon className="svg-icon" icon="circle-info" />
        {t('common.application_sidebar.items.information.text')}
      </Menu.List.Item>

      <Menu.List.Item renderAs={Link} to={DYNAMIC_PROTECTED_ROUTES.applicationSettings(domain)} active={active === 'settings'}>
        <FontAwesomeIcon className="svg-icon" icon="wrench" />
        {t('common.application_sidebar.items.settings.text')}
      </Menu.List.Item>
    </Fragment>
  );
};

export default SidebarItems;
