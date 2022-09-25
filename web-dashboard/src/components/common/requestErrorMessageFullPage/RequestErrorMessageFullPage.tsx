import React from 'react';
import { Content } from 'react-bulma-components';
import RequestErrorMessage from '../requestErrorMessage';

interface Props {
  error?: Error | null
}

const RequestErrorMessageFullPage: React.FC<Props> = ({ error }) => {
  return (
    <Content className="request-error-full-page">
      <RequestErrorMessage error={error} />
    </Content>
  );
};

export default RequestErrorMessageFullPage;
