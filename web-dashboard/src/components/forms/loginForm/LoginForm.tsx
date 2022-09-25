import React from 'react';
import LoginFormLogic from './LoginFormLogic';
import useAuth from '../../../hooks/auth';
import useLocale from '../../../hooks/locale';
import { AuthError } from '../../../errors/auth';
import { LoginData } from './types';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLocale();

  const handleSubmit = async ({ username, password }: LoginData) => {
    try {
      await login(username, password);
    } catch (error) {
      if (error instanceof AuthError) {
        throw error.getFriendlyMessage(t) ?? error.message;
      }

      throw (error as Error).message;
    }
  };

  return (
    <LoginFormLogic onSubmit={handleSubmit} />
  );
};

export default LoginForm;
