import React from 'react';
import { Heading } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import PageWrapper from '../../components/common/pageWrapper';
import ApplicationSidebar from '../../components/common/applicationSidebar';
import useTitle from '../../hooks/title';
import useApi from '../../hooks/api';

const ApplicationEntryTablePage: React.FC = () => {
  const { domain } = useParams();
  const { client } = useApi();
  const request = client.application.getApplicationByDomain(domain!);
  const { isLoading, error, data: application } = useQuery(request.key, request.fn);
  useTitle('pages.application.entries.title', { app: application?.name ?? 'Loading...' });

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
    <PageWrapper>
      <ApplicationSidebar active="entries" domain={domain!}>
        <Heading>
          Data Entries
        </Heading>
      </ApplicationSidebar>
    </PageWrapper>
  );
};

export default ApplicationEntryTablePage;
