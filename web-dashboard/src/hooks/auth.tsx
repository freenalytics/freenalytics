import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useAuth = () => {
  const { token, me, updateToken, client } = useContext(AppContext)!;

  const login = async (username: string, password: string) => {
    const { token } = await client.auth.postLogin(username, password);
    updateToken(token);
  };

  const register = () => {
    return Promise.resolve();
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
