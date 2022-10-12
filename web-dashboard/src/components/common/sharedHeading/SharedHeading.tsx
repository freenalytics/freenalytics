import React from 'react';
import { Heading } from 'react-bulma-components';

interface Props {
  heading: string,
  children: React.ReactNode
}

const SharedHeading: React.FC<Props> = ({ heading, children }) => {
  return (
    <div className="shared-heading">
      <Heading>
        {heading}
      </Heading>

      {children}
    </div>
  );
};

export default SharedHeading;
