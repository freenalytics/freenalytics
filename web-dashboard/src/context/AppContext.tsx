import React, { useState, useCallback, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserPayload } from '../types/user';

interface Context {
  token: string
  me: UserPayload | null
  updateToken: (token: string) => void
}

interface Props {
  children: React.ReactNode
}

const AppContext = React.createContext<Context | null>(null);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [me, setMe] = useState<UserPayload | null>(null);

  const updateToken = useCallback((token: string) => {
    const decoded = jwtDecode<UserPayload>(token);

    if (Date.now() >= decoded.exp * 1000) {
      localStorage.removeItem('token');
      return;
    }

    setToken(token);
    localStorage.setItem('token', token);

    setMe(decoded);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      updateToken(storedToken);
    }
  }, [updateToken]);

  const context: Context = {
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
