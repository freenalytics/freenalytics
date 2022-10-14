import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
  const { client, queryClient } = useApi();
  const request = client.application.getApplicationByDomain(domain);
  const { isLoading, error, data: application } = useQuery(request.key, request.fn);
  const updateRequest = client.application.patchApplicationByDomain(domain);
  const updateMutation = useMutation(updateRequest.key, updateRequest.fn);

  const handleSubmit = async (data: UpdateApplicationData) => {
    const newApplication = await updateMutation.mutateAsync(data);
    queryClient.setQueryData(updateRequest.key, newApplication);
    await queryClient.invalidateQueries(client.application.getApplications().key);

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
