import React from 'react';
import RegisterFormLogic from './RegisterFormLogic';
import useAuth from '../../../hooks/auth';
import useLocale from '../../../hooks/locale';
import { AuthError } from '../../../errors/auth';
import { RegistrationData } from './types';

interface Props {
  onRegistrationComplete: () => void
}

const RegisterForm: React.FC<Props> = ({ onRegistrationComplete }) => {
  const { register } = useAuth();
  const { t, currentLocale } = useLocale();

  const handleSubmit = async ({ username, password }: RegistrationData) => {
    try {
      await register(username, password, currentLocale);
      onRegistrationComplete();
    } catch (error) {
      if (error instanceof AuthError) {
        throw error.getFriendlyMessage(t) ?? error.message;
      }

      throw (error as Error).message;
    }
  };

  return (
    <RegisterFormLogic onSubmit={handleSubmit} />
  );
};

export default RegisterForm;
