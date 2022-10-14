import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CreateApplicationData } from './types';

interface Props {
  form: UseFormReturn<CreateApplicationData>
  onSubmit: SubmitHandler<CreateApplicationData>
  error?: string
}

const CreateApplicationFormView: React.FC<Props> = () => {
  return (
    <div>
      form
    </div>
  );
};

export default CreateApplicationFormView;
