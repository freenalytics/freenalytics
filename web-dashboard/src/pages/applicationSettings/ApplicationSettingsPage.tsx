import React from 'react';
import { Heading } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import PageWrapper from '../../components/common/pageWrapper';
import ApplicationSidebar from '../../components/common/applicationSidebar';
import ApplicationSettingsForm from '../../components/forms/applicationSettingsForm';
import useTitle from '../../hooks/title';
import useLocale from '../../hooks/locale';
import useApi from '../../hooks/api';

const ApplicationSettingsPage: React.FC = () => {
  const { domain } = useParams();
  const { t } = useLocale();
  const { client } = useApi();
  const request = client.application.getApplicationByDomain(domain!);
  const { isLoading, error, data: application } = useQuery(request.key, request.fn);
  useTitle('pages.application.settings.title', { app: application?.name ?? 'Loading...' });

  const handleComplete = () => {
    console.log('done');
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
    <PageWrapper>
      <ApplicationSidebar active="settings" domain={domain!}>
        <Heading>
          {t('pages.application.settings.header.text')}
        </Heading>

        <ApplicationSettingsForm domain={domain!} onComplete={handleComplete} />
      </ApplicationSidebar>
    </PageWrapper>
  );
};

export default ApplicationSettingsPage;
