import React from 'react';
import useTitle from '../../hooks/title';

const CreateApplicationPage: React.FC = () => {
  useTitle('pages.create_application.title');

  return (
    <div>
      CREATE NEW
    </div>
  );
};

export default CreateApplicationPage;
