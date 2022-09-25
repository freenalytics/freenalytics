import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useAuth = () => {
  const { token, me, updateToken, client } = useContext(AppContext)!;

  const login = async (username: string, password: string) => {
    const { token } = await client.auth.postLogin(username, password);
    updateToken(token);
  };

  const register = async (username: string, password: string, locale: string) => {
    await client.auth.postRegister(username, password, locale);
  };

  const logout = () => {
    updateToken(null);
  };

  return {
    token,
    loggedIn: !!token && !!me,
    me,

    login,
    register,
    logout
  };
};

export default useAuth;
