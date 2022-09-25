import React from 'react';
import { Message } from 'react-bulma-components';

interface Props {
  visible?: boolean
  header?: string
  description: string
}

const FormErrorMessage: React.FC<Props> = ({
  visible = true,
  header,
  description
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Message color="danger">
      <Message.Body>
        {
          header &&
          <strong>
            {header}
          </strong>
        }

        <p>
          {description}
        </p>
      </Message.Body>
    </Message>
  );
};

export default FormErrorMessage;
