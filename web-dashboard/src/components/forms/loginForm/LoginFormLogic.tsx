import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginFormView from './LoginFormView';
import { LoginData } from './types';

interface Props {
  onSubmit: SubmitHandler<LoginData>
}

const LoginFormLogic: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<LoginData>({
    mode: 'onSubmit'
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: LoginData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <LoginFormView form={form} onSubmit={handleSubmit} error={error} />
  );
};

export default LoginFormLogic;
