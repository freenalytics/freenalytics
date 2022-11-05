import React, { useState } from 'react';
import { Content } from 'react-bulma-components';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../common/loading';
import RequestErrorMessage from '../../../common/requestErrorMessage';
import DataDashboardHeader from '../dataDashboardHeader';
import useApi from '../../../../hooks/api';
import DataVisualizations from '../dataVisualizations';

interface Props {
  domain: string
  schema: object
}

const DataDashboard: React.FC<Props> = ({ domain, schema }) => {
  const [limit, setLimit] = useState<number>(50);
  const { client, queryClient } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start: 0, limit });
  const { isLoading, error, data } = useQuery(request.key, request.fn);

  const handleForceRefresh = async () => {
    await queryClient.refetchQueries(request.key);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

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
    <Content>
      <DataDashboardHeader onRefresh={handleForceRefresh} onLimitChange={handleLimitChange} />
      <DataVisualizations schema={schema} data={data!.result} />
    </Content>
  );
};

export default DataDashboard;
