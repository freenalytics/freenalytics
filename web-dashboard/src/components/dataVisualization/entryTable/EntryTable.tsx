import React, { useState } from 'react';
import { Box } from 'react-bulma-components';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../common/loading';
import RequestErrorMessage from '../../common/requestErrorMessage';
import EntryTableView from './EntryTableView';
import PageSelector from '../../common/pageSelector';
import useApi from '../../../hooks/api';
import useQueryParams from '../../../hooks/queryParams';

const QUERY_PARAM_KEY = 'table_start';

interface Props {
  domain: string
  schema: object
}

const EntryTable: React.FC<Props> = ({ domain, schema }) => {
  const { queryParams, setQueryParam } = useQueryParams();
  const [start, setStart] = useState<number>(parseInt(queryParams.get(QUERY_PARAM_KEY) ?? '0', 10));
  const { client } = useApi();
  const request = client.application.getApplicationDataByDomain(domain, { start, limit: 10 });
  const { isLoading, error, data } = useQuery(request.key, request.fn);

  const handlePageChange = (pointer: number) => {
    setStart(pointer);
    setQueryParam(QUERY_PARAM_KEY, pointer.toString());
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
