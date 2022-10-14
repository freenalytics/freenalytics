import React from 'react';
import { Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageWrapper from '../../components/common/pageWrapper';
import Loading from '../../components/common/loading';
import SharedHeading from '../../components/common/sharedHeading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import ApplicationCardGroup from '../../components/pageComponents/applications/applicationCardGroup';
import useTitle from '../../hooks/title';
import useLocale from '../../hooks/locale';
import useApi from '../../hooks/api';
import { PROTECTED_ROUTES } from '../../constants/routes';

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
    <PageWrapper>
      <SharedHeading heading={t('pages.applications.title')}>
        <Button color="primary" renderAs={Link} to={PROTECTED_ROUTES.createApplication}>
          {t('pages.applications.buttons.create.label')}
        </Button>
      </SharedHeading>

      <ApplicationCardGroup applications={applications!} />
    </PageWrapper>
  );
};

export default ApplicationsPage;
