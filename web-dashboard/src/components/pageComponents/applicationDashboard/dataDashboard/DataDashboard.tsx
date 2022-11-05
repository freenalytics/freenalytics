import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../common/loading';
import RequestErrorMessage from '../../../common/requestErrorMessage';
import useApi from '../../../../hooks/api';

interface Props {
  domain: string
}

const DataDashboard: React.FC<Props> = ({ domain }) => {
  const { client } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start: 0, limit: 50 });
  const { isLoading, error, data } = useQuery(request.key, request.fn);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <RequestErrorMessage error={error as Error} />
    );
  }

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default DataDashboard;
