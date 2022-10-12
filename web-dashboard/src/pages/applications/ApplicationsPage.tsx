import React from 'react';
import PageWrapper from '../../components/common/pageWrapper';
import useTitle from '../../hooks/title';

const ApplicationsPage: React.FC = () => {
  useTitle('pages.applications.title');

  return (
    <PageWrapper className="applications-page">
      Applications
    </PageWrapper>
  );
};

export default ApplicationsPage;
