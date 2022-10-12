import React, { useState } from 'react';
import { Navbar as BulmaNavbar } from 'react-bulma-components';
import NavbarRightItem from './NavbarRightItem';
import useAuth from '../../../hooks/auth';
import useLocale from '../../../hooks/locale';
import { PROTECTED_ROUTES } from '../../../constants/routes';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { loggedIn, logout } = useAuth();
  const { t } = useLocale();

  const handleSignOutClick = () => {
    logout();
  };

  const handleBurgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <BulmaNavbar>
      <BulmaNavbar.Brand>
        <BulmaNavbar.Item>
          <img
            alt="app logo"
            src="/android-chrome-192x192.png"
          />
        </BulmaNavbar.Item>
        <BulmaNavbar.Burger onClick={handleBurgerClick} />
      </BulmaNavbar.Brand>

      <BulmaNavbar.Menu className={menuOpen ? 'is-active' : ''}>
        <BulmaNavbar.Container>
          <BulmaNavbar.Item href={PROTECTED_ROUTES.applications}>
            {t('common.navbar.items.applications.text')}
          </BulmaNavbar.Item>
        </BulmaNavbar.Container>

        <BulmaNavbar.Container align="right">
          <NavbarRightItem loggedIn={loggedIn} onSignOutClick={handleSignOutClick} />
        </BulmaNavbar.Container>
      </BulmaNavbar.Menu>
    </BulmaNavbar>
  );
};

export default Navbar;
