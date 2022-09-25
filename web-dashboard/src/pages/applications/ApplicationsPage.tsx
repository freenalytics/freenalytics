import React from 'react';
import useTitle from '../../hooks/title';

const ApplicationsPage: React.FC = () => {
  useTitle('pages.applications.title');

  return (
    <div>
      Applications
    </div>
  );
};

export default ApplicationsPage;
