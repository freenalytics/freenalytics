import React from 'react';
import { Navbar } from 'react-bulma-components';
import NavbarBase from './NavbarBase';
import useAuth from '../../../hooks/auth';
import useLocale from '../../../hooks/locale';
import { PROTECTED_ROUTES } from '../../../constants/routes';

const UserNavbar = () => {
  const { logout } = useAuth();
  const { t } = useLocale();

  const handleSignOutClick = () => {
    logout();
  };

  return (
    <NavbarBase>
      <Navbar.Container>
        <Navbar.Item href={PROTECTED_ROUTES.applications}>
          {t('common.navbar.items.applications.text')}
        </Navbar.Item>
      </Navbar.Container>

      <Navbar.Container align="right">
        <Navbar.Item onClick={handleSignOutClick}>
          {t('common.navbar.items.sign_out.text')}
        </Navbar.Item>
      </Navbar.Container>
    </NavbarBase>
  );
};

export default UserNavbar;
