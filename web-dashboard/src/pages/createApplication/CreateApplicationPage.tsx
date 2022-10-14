import React from 'react';
import { Heading } from 'react-bulma-components';
import PageWrapper from '../../components/common/pageWrapper';
import CreateInstructions from '../../components/pageComponents/createApplication/createInstructions';
import useTitle from '../../hooks/title';
import useLocale from '../../hooks/locale';

const CreateApplicationPage: React.FC = () => {
  useTitle('pages.create_application.title');
  const { t } = useLocale();

  return (
    <PageWrapper>
      <Heading>
        {t('pages.create_application.title')}
      </Heading>
      <CreateInstructions />
    </PageWrapper>
  );
};

export default CreateApplicationPage;
