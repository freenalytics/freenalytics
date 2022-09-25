import React from 'react';
import { Box, Form, Button, Heading, Block } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { UseFormReturn, SubmitHandler } from 'react-hook-form';
import FormErrorMessage from '../../common/formErrorMessage';
import useLocale from '../../../hooks/locale';
import useFormHelper from '../../../hooks/formHelper';
import { PUBLIC_ROUTES } from '../../../constants/routes';
import { LoginData } from './types';

interface Props {
  form: UseFormReturn<LoginData>
  onSubmit: SubmitHandler<LoginData>
  error?: string
}

const LoginFormView: React.FC<Props> = ({ form, onSubmit, error }) => {
  const { t } = useLocale();
  const { handleChangeNoValidation } = useFormHelper<LoginData>(form);
  const { handleSubmit } = form; // TODO: Form loading

  return (
    <Box className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrorMessage visible={!!error} header={t('forms.login.errors.header.text')} description={error!} />

        <Heading textAlign="center" size={5}>
          {t('forms.login.header.text')}
        </Heading>

        <Form.Field>
          <Form.Label>
            {t('forms.login.username.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" name="username" onChange={handleChangeNoValidation} />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.login.password.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="password" name="password" onChange={handleChangeNoValidation} />
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
