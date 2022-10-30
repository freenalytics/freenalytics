import React from 'react';
import { Content, Heading } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import PageWrapper from '../../components/common/pageWrapper';
import ApplicationSidebar from '../../components/common/applicationSidebar';
import SchemaPreview from '../../components/pageComponents/applicationInformation/schemaPreview';
import ApiUrlBlock from '../../components/common/apiUrlBlock';
import DataExamplePreview from '../../components/pageComponents/applicationInformation/dataExamplePreview';
import ConnectorsPreview from '../../components/pageComponents/applicationInformation/connectorsPreview';
import useTitle from '../../hooks/title';
import useApi from '../../hooks/api';
import useLocale from '../../hooks/locale';

const ApplicationInformationPage = () => {
  const { domain } = useParams();
  const { t } = useLocale();
  const { client } = useApi();
  const request = client.application.getApplicationByDomain(domain!);
  const { isLoading, error, data: application } = useQuery(request.key, request.fn);
  useTitle('pages.application.information.title', { app: application?.name ?? 'Loading...' });

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
      <ApplicationSidebar active="information" domain={domain!}>
        <Heading>
          {t('pages.application.information.header.text')}
        </Heading>

        <Content>
          <h2>
            {t('pages.application.information.upload.header.text')}
          </h2>
          <p>
            {t('pages.application.information.upload.schema_preview.text')}
          </p>
          <SchemaPreview rawSchema={application!.template.raw_schema} />

          <p>
            {t('pages.application.information.upload.data_example.text')}
          </p>
          <ApiUrlBlock method="POST" path={`applications/${domain}/data`} />
          <DataExamplePreview schema={application!.template.schema} />
        </Content>

        <Content>
          <h2>
            {t('pages.application.information.connectors.header.text')}
          </h2>
          <ConnectorsPreview connectors={application!.connectors} />
        </Content>
      </ApplicationSidebar>
    </PageWrapper>
  );
};

export default ApplicationInformationPage;
