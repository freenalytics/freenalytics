import React, { Fragment } from 'react';
import { Container } from 'react-bulma-components';
import Navbar from '../navbar';

interface Props {
  className: string,
  children: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ className = '', children }) => {
  return (
    <Fragment>
      <Navbar />
      <Container className={`page-wrapper ${className}`.trimEnd()}>
        {children}
      </Container>
    </Fragment>
  );
};

export default PageWrapper;
