import React from 'react';
import { useMutation } from '@tanstack/react-query';
import CreateApplicationFormLogic from './CreateApplicationFormLogic';
import useApi from '../../../hooks/api';
import { CreateApplicationData } from './types';

interface Props {
  onComplete: (domain: string) => void
}

const CreateApplicationForm: React.FC<Props> = ({ onComplete }) => {
  const { client } = useApi();
  const request = client.application.postApplication();
  const createMutation = useMutation(request.key, request.fn);

  const handleSubmit = async (data: CreateApplicationData) => {
    const application = await createMutation.mutateAsync(data);
    onComplete(application.domain);
  };

  return (
    <CreateApplicationFormLogic onSubmit={handleSubmit} />
  );
};

export default CreateApplicationForm;
