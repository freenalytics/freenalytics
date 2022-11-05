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
  const [refetchInterval, setRefetchInterval] = useState<number | false>(30000);
  const { client, queryClient } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start: 0, limit });
  const { isLoading, error, data } = useQuery(request.key, request.fn, { refetchInterval });

  const handleForceRefresh = async () => {
    await queryClient.refetchQueries(request.key);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  const handleIntervalChange = (interval: number | false) => {
    if (!interval) {
      setRefetchInterval(false);
    } else {
      setRefetchInterval(interval * 1000);
    }
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
      <DataDashboardHeader onRefresh={handleForceRefresh} onLimitChange={handleLimitChange} onIntervalChange={handleIntervalChange} />
      <DataVisualizations schema={schema} data={data!.result} />
    </Content>
  );
};

export default DataDashboard;
