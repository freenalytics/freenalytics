import React, { useState, useCallback, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserPayload } from '../types/user';
import Client from '../services/api/Client';

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
  const [token, setToken] = useState<string>('');
  const [me, setMe] = useState<UserPayload | null>(null);

  const deleteToken = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
    client.setToken(null);
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

    setToken(token);
    localStorage.setItem('token', token);
    client.setToken(token);
    setMe(decoded);
  }, [deleteToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      updateToken(storedToken);
    }
  }, [updateToken]);

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
