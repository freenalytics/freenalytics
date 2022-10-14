import React from 'react';
import CreateApplicationFormLogic from './CreateApplicationFormLogic';
import { CreateApplicationData } from './types';

interface Props {
  onComplete: (domain: string) => void
}

const CreateApplicationForm: React.FC<Props> = ({ onComplete }) => {
  const handleSubmit = (data: CreateApplicationData) => {
    console.log(data);
    onComplete('123');
  };

  return (
    <CreateApplicationFormLogic onSubmit={handleSubmit} />
  );
};

export default CreateApplicationForm;
