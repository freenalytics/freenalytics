import React from 'react';
import LoginFormLogic from './LoginFormLogic';
import useAuth from '../../../hooks/auth';
import { LoginData } from './types';

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const handleSubmit = async ({ username, password }: LoginData) => {
    try {
      await login(username, password);
    } catch (error) {
      // TODO: Rethrow error message.
    }
  };

  return (
    <LoginFormLogic onSubmit={handleSubmit} />
  );
};

export default LoginForm;
