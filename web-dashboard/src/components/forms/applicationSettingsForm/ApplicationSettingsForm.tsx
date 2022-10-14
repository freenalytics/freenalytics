import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../common/loading';
import RequestErrorMessageFullPage from '../../common/requestErrorMessageFullPage';
import ApplicationSettingsFormLogic from './ApplicationSettingsFormLogic';
import useApi from '../../../hooks/api';
import { UpdateApplicationData } from './types';

interface Props {
  domain: string
  onComplete: () => void
}

const ApplicationSettingsForm: React.FC<Props> = ({ domain, onComplete }) => {
  const { client } = useApi();
  const request = client.application.getApplicationByDomain(domain);
  const { isLoading, error, data: application } = useQuery(request.key, request.fn);

  const handleSubmit = async (data: UpdateApplicationData) => {
    console.log(data);
    onComplete();
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <RequestErrorMessageFullPage error={error as Error} />
    );
  }

  return (
    <ApplicationSettingsFormLogic initialData={application!} onSubmit={handleSubmit} />
  );
};

export default ApplicationSettingsForm;
