import React from 'react';
import useTitle from '../../hooks/title';

const NotFoundPage: React.FC = () => {
  useTitle('pages.not_found.title');

  return (
    <div>
      Not Found
    </div>
  );
};

export default NotFoundPage;
