import React from 'react';
import { Box, Form, Button, Heading, Block } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import useLocale from '../../../hooks/locale';
import { PUBLIC_ROUTES } from '../../../constants/routes';

interface Props {

}

const LoginFormView: React.FC<Props> = () => {
  const { t } = useLocale();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Box className="login-form">
      <form onSubmit={handleSubmit}>
        <Heading textAlign="center" size={5}>
          {t('forms.login.header.text')}
        </Heading>
        <Form.Field>
          <Form.Label>
            {t('forms.login.username.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.login.password.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" />
          </Form.Control>
        </Form.Field>

        <Button.Group align="center">
          <Button color="primary" submit>
            {t('forms.login.buttons.login.label')}
          </Button>
        </Button.Group>
      </form>

      <Block mt={5}>
        <Link to={PUBLIC_ROUTES.register}>
          {t('forms.login.extra.register.text')}
        </Link>
      </Block>
    </Box>
  );
};

export default LoginFormView;
