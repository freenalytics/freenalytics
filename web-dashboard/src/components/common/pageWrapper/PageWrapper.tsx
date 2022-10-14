import React from 'react';
import { Container } from 'react-bulma-components';
import Navbar from '../navbar';
import Footer from '../footer';

interface Props {
  className?: string,
  children: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Container className={`page ${className}`.trimEnd()}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageWrapper;
