import React from 'react';
import { useParams } from 'react-router-dom';
import useTitle from '../../hooks/title';

const ApplicationDashboardPage: React.FC = () => {
  useTitle('pages.application.dashboard.title', { app: 'My App' });
  const { domain } = useParams();

  return (
    <div>
      DASHBOARD - {domain}
    </div>
  );
};

export default ApplicationDashboardPage;
