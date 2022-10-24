import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../common/loading';
import RequestErrorMessage from '../../common/requestErrorMessage';
import EntryTableView from './EntryTableView';
import useApi from '../../../hooks/api';

interface Props {
  domain: string
  schema: object
}

const EntryTable: React.FC<Props> = ({ domain, schema }) => {
  const [start] = useState<number>(0);
  const { client } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start, limit: 10 });
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
    <EntryTableView data={data!.result} schema={schema} startIndex={start} />
  );
};

export default EntryTable;
