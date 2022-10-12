import React from 'react';
import { Navbar } from 'react-bulma-components';
import useLocale from '../../../hooks/locale';
import { PUBLIC_ROUTES } from '../../../constants/routes';

interface Props {
  loggedIn: boolean,
  onSignOutClick: () => void
}

const NavbarRightItem: React.FC<Props> = ({ loggedIn, onSignOutClick }) => {
  const { t } = useLocale();

  if (loggedIn) {
    return (
      <Navbar.Item onClick={onSignOutClick}>
        {t('common.navbar.items.sign_out.text')}
      </Navbar.Item>
    );
  }

  return (
    <Navbar.Item href={PUBLIC_ROUTES.login}>
      {t('common.navbar.items.login.text')}
    </Navbar.Item>
  );
};

export default NavbarRightItem;
