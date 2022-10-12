import React, { useState } from 'react';
import { Navbar as BulmaNavbar } from 'react-bulma-components';

interface Props {
  children: React.ReactNode
}

const NavbarBase: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
        {children}
      </BulmaNavbar.Menu>
    </BulmaNavbar>
  );
};

export default NavbarBase;
