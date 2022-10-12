import React from 'react';
import { Container } from 'react-bulma-components';

interface Props {
  className: string,
  children: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ className = '', children }) => {
  return (
    <Container className={`page-wrapper ${className}`.trimEnd()}>
      {children}
    </Container>
  );
};

export default PageWrapper;
