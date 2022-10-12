import React from 'react';
import UserNavbar from './UserNavbar';
import GuestNavbar from './GuestNavbar';
import useAuth from '../../../hooks/auth';

const Navbar = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return (
      <UserNavbar />
    );
  }

  return (
    <GuestNavbar />
  );
};

export default Navbar;
