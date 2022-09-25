import React from 'react';
import { Box, Form, Button, Heading } from 'react-bulma-components';
import { UseFormReturn, SubmitHandler } from 'react-hook-form';
import FormErrorMessage from '../../common/formErrorMessage';
import useLocale from '../../../hooks/locale';
// import useFormHelper from '../../../hooks/formHelper';
import { RegistrationData } from './types';

interface Props {
  form: UseFormReturn<RegistrationData>
  onSubmit: SubmitHandler<RegistrationData>
  error?: string
}

const RegisterFormView: React.FC<Props> = ({ form, onSubmit, error }) => {
  const { t } = useLocale();
  // const {} = useFormHelper<RegistrationData>(form);
  const { handleSubmit, formState: { isSubmitting } } = form;

  return (
    <Box className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrorMessage visible={!!error} header={t('forms.register.errors.header.text')} description={error!} />

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
          <Button color="primary" submit loading={isSubmitting}>
            {t('forms.register.buttons.register.label')}
          </Button>
        </Button.Group>
      </form>
    </Box>
  );
};

export default RegisterFormView;
