import React from 'react';
import { Message } from 'react-bulma-components';
import useLocale from '../../../hooks/locale';
import { RequestError } from '../../../errors/http';

interface Props {
  error?: Error | null
}

const RequestErrorMessage: React.FC<Props> = ({ error }) => {
  const { t } = useLocale();

  if (!error) {
    return null;
  }

  const errorResponse = error instanceof RequestError ? error.getResponse() : null;

  return (
    <Message color="danger">
      <Message.Header>
        <span>
          {t('errors.request.header.text')}
        </span>
      </Message.Header>

      <Message.Body>
        <p>
          {t('errors.request.body.description')}
        </p>

        <p>
          <strong>
            {error.message}
          </strong>
        </p>

        {
          errorResponse &&
          <pre>
            {errorResponse}
          </pre>
        }

        <pre>
          {error.stack}
        </pre>
      </Message.Body>
    </Message>
  );
};

export default RequestErrorMessage;
