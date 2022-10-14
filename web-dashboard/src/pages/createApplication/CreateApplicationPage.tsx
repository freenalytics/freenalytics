import React from 'react';
import { Heading } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/common/pageWrapper';
import CreateInstructions from '../../components/pageComponents/createApplication/createInstructions';
import CreateApplicationForm from '../../components/forms/createApplicationForm';
import useTitle from '../../hooks/title';
import useLocale from '../../hooks/locale';
import { DYNAMIC_PROTECTED_ROUTES } from '../../constants/routes';

const CreateApplicationPage: React.FC = () => {
  useTitle('pages.create_application.title');
  const { t } = useLocale();
  const navigate = useNavigate();

  const handleComplete = (domain: string) => {
    navigate(DYNAMIC_PROTECTED_ROUTES.applicationDashboard(domain));
  };

  return (
    <PageWrapper>
      <Heading>
        {t('pages.create_application.title')}
      </Heading>
      <CreateInstructions />

      <CreateApplicationForm onComplete={handleComplete} />
    </PageWrapper>
  );
};

export default CreateApplicationPage;
