import React from 'react';
import { Box, Form, Button, Heading } from 'react-bulma-components';
import useLocale from '../../../hooks/locale';

interface Props {

}

const RegisterFormView: React.FC<Props> = () => {
  const { t } = useLocale();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Box className="register-form">
      <form onSubmit={handleSubmit}>
        <Heading textAlign="center" size={5}>
          {t('forms.register.header.text')}
        </Heading>

        <Form.Field>
          <Form.Label>
            {t('forms.register.username.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.register.password.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="password" />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.register.password_confirm.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="password" />
          </Form.Control>
        </Form.Field>

        <Button.Group align="center">
          <Button color="primary" submit>
            {t('forms.register.buttons.register.label')}
          </Button>
        </Button.Group>
      </form>
    </Box>
  );
};

export default RegisterFormView;
