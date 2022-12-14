import React, { useState } from 'react';
import { Heading } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import PageWrapper from '../../components/common/pageWrapper';
import ApplicationSidebar from '../../components/common/applicationSidebar';
import ApplicationSettingsForm from '../../components/forms/applicationSettingsForm';
import ApplicationUpdatedAlert from '../../components/pageComponents/applicationSettings/applicationUpdatedAlert';
import SettingsDangerZone from '../../components/pageComponents/applicationSettings/settingsDangerZone';
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
  const [complete, setComplete] = useState<boolean>(false);

  const handleComplete = () => {
    setComplete(true);
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

        {
          complete &&
            <ApplicationUpdatedAlert />
        }

        <ApplicationSettingsForm domain={domain!} onComplete={handleComplete} />

        <SettingsDangerZone domain={domain!} />
      </ApplicationSidebar>
    </PageWrapper>
  );
};

export default ApplicationSettingsPage;
