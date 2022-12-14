import React from 'react';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import NavbarBase from './NavbarBase';
import useLocale from '../../../hooks/locale';
import { PUBLIC_ROUTES } from '../../../constants/routes';

const GuestNavbar = () => {
  const { t } = useLocale();

  return (
    <NavbarBase>
      <Navbar.Container align="right">
        <Navbar.Item renderAs={Link} to={PUBLIC_ROUTES.login}>
          {t('common.navbar.items.login.text')}
        </Navbar.Item>
      </Navbar.Container>
    </NavbarBase>
  );
};

export default GuestNavbar;
