import React, { useState } from 'react';
import { Box } from 'react-bulma-components';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../common/loading';
import RequestErrorMessage from '../../common/requestErrorMessage';
import EntryTableView from './EntryTableView';
import useApi from '../../../hooks/api';
import PageSelector from '../../common/pageSelector';

interface Props {
  domain: string
  schema: object
}

const EntryTable: React.FC<Props> = ({ domain, schema }) => {
  const [start, setStart] = useState<number>(0);
  const { client } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start, limit: 10 });
  const { isLoading, error, data } = useQuery(request.key, request.fn);

  const handlePageChange = (pointer: number) => {
    setStart(pointer);
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
    <Box>
      <EntryTableView data={data!.result} schema={schema} startIndex={start} />
      <PageSelector onPageChange={handlePageChange} {...data!.pagination} />
    </Box>
  );
};

export default EntryTable;
