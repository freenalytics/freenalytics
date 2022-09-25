import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useAuth = () => {
  const { token, me } = useContext(AppContext)!;

  const login = (username: string, password: string) => {
    console.log(username, password);
    return Promise.resolve({ username, password });
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
