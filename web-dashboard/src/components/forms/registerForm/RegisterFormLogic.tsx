import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterFormView from './RegisterFormView';
import { RegistrationData } from './types';

interface Props {
  onSubmit: SubmitHandler<RegistrationData>
}

const RegisterFormLogic: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<RegistrationData>({
    mode: 'onSubmit'
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: RegistrationData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <RegisterFormView form={form} onSubmit={handleSubmit} error={error} />
  );
};

export default RegisterFormLogic;
