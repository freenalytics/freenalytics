import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useAuth = () => {
  const { token, me } = useContext(AppContext)!;

  const login = () => {
    return Promise.resolve();
  };

  const register = () => {
    return Promise.resolve();
  };

  return {
    token,
    loggedIn: !!token && !!me,
    me,

    login,
    register
  };
};

export default useAuth;
