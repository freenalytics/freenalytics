import React, { useState, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { UserPayload } from '../types/user';
import Client from '../services/api/Client';

const getInitialMe = (token: string) => {
  try {
    return jwtDecode<UserPayload>(token);
  } catch (_) {
    return null;
  }
};

interface Context {
  client: Client
  token: string
  me: UserPayload | null
  updateToken: (token: string | null) => void,
}

interface Props {
  children: React.ReactNode
}

const client = new Client(process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : `${window.location.origin}/api`);

const AppContext = React.createContext<Context | null>(null);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') ?? '');
  const [me, setMe] = useState<UserPayload | null>(getInitialMe(token));
  client.setToken(token);

  const deleteToken = useCallback(() => {
    localStorage.removeItem('token');
    client.setToken(null);
    setToken('');
    setMe(null);
  }, []);

  const updateToken = useCallback((token: string | null) => {
    if (!token) {
      return deleteToken();
    }

    const decoded = jwtDecode<UserPayload>(token);
    if (Date.now() >= decoded.exp * 1000) {
      return deleteToken();
    }

    localStorage.setItem('token', token);
    client.setToken(token);
    setToken(token);
    setMe(decoded);
  }, [deleteToken]);

  client.once('invalidated', deleteToken);

  const context: Context = {
    client,
    token,
    me,
    updateToken
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

export {
  AppContextProvider
};

export default AppContext;
