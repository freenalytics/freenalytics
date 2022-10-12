import React from 'react';
import { Heading } from 'react-bulma-components';
import { useQuery } from '@tanstack/react-query';
import PageWrapper from '../../components/common/pageWrapper';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import ApplicationCardGroup from '../../components/pageComponents/applications/applicationCardGroup';
import useTitle from '../../hooks/title';
import useLocale from '../../hooks/locale';
import useApi from '../../hooks/api';

const ApplicationsPage: React.FC = () => {
  useTitle('pages.applications.title');
  const { t } = useLocale();
  const { client } = useApi();
  const request = client.application.getApplications();
  const { isLoading, error, data: applications } = useQuery(request.key, request.fn);

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
    <PageWrapper className="applications-page">
      <Heading>
        {t('pages.applications.title')}
      </Heading>
      <ApplicationCardGroup applications={applications!} />
    </PageWrapper>
  );
};

export default ApplicationsPage;
