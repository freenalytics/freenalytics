import React from 'react';
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import RequestErrorMessage from '../../common/requestErrorMessage';
import ApplicationTypePicker from '../../common/form/applicationTypePicker';
import ApplicationConnectorsFormField from '../../common/form/applicationConnectorsFormField';
import useLocale from '../../../hooks/locale';
import useFormHelper from '../../../hooks/formHelper';
import { UpdateApplicationData } from './types';

interface Props {
  form: UseFormReturn<UpdateApplicationData>
  onSubmit: SubmitHandler<UpdateApplicationData>
  error?: Error | null
}

const ApplicationSettingsFormView: React.FC<Props> = ({ form, onSubmit, error }) => {
  const { t } = useLocale();
  const { handleChangeNoValidation, handleBlurValidate, handleChangeWithValidation } = useFormHelper<UpdateApplicationData>(form);
  const { handleSubmit, getValues, formState: { isSubmitting, errors } } = form;

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RequestErrorMessage error={error} />

        <Form.Field>
          <Form.Label>
            {t('forms.application_settings.name.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" name="name" onChange={handleChangeNoValidation} onBlur={handleBlurValidate} placeholder={getValues('name')} />
            <Icon align="left">
              <FontAwesomeIcon icon="font" />
            </Icon>
          </Form.Control>
          <Form.Help color="danger">
            {errors.name?.message}
          </Form.Help>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.application_settings.type.label')}
          </Form.Label>
          <Form.Control>
            <ApplicationTypePicker name="type" onChange={handleChangeWithValidation} defaultValue={getValues('type')} />
          </Form.Control>
          <Form.Help color="danger">
            {errors.type?.message}
          </Form.Help>
        </Form.Field>

        <ApplicationConnectorsFormField form={form} />

        <Button.Group align="right">
          <Button color="primary" submit loading={isSubmitting}>
            {t('forms.application_settings.buttons.save.label')}
          </Button>
        </Button.Group>
      </form>
    </Box>
  );
};

export default ApplicationSettingsFormView;
