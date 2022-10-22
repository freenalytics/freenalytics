import React from 'react';
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import RequestErrorMessage from '../../common/requestErrorMessage';
import ApplicationTypePicker from '../../common/form/applicationTypePicker';
import ApplicationConnectorsFormField from '../../common/form/applicationConnectorsFormField';
import useLocale from '../../../hooks/locale';
import useFormHelper from '../../../hooks/formHelper';
import { CreateApplicationData } from './types';

interface Props {
  form: UseFormReturn<CreateApplicationData>
  onSubmit: SubmitHandler<CreateApplicationData>
  error?: Error | null
}

const CreateApplicationFormView: React.FC<Props> = ({ form, onSubmit, error }) => {
  const { t } = useLocale();
  const { handleChangeNoValidation, handleBlurValidate, handleChangeWithValidation } = useFormHelper<CreateApplicationData>(form);
  const { handleSubmit, formState: { isSubmitting, errors } } = form;

  return (
    <Box className="create-application-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <RequestErrorMessage error={error} />

        <Form.Field>
          <Form.Label>
            {t('forms.create_application.name.label')}
          </Form.Label>
          <Form.Control>
            <Form.Input type="text" name="name" required onChange={handleChangeNoValidation} onBlur={handleBlurValidate} />
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
            {t('forms.create_application.type.label')}
          </Form.Label>
          <Form.Control>
            <ApplicationTypePicker name="type" required onChange={handleChangeWithValidation} />
          </Form.Control>
          <Form.Help color="danger">
            {errors.type?.message}
          </Form.Help>
        </Form.Field>

        <Form.Field>
          <Form.Label>
            {t('forms.create_application.schema.label')}
          </Form.Label>
          <Form.Control>
            <div className="code-editor" data-color-mode="light">
              <CodeEditor
                name="schema"
                language="yaml"
                padding={15}
                placeholder={t('forms.create_application.schema.placeholder')}
                onChange={handleChangeNoValidation}
                onBlur={handleBlurValidate}
              />
            </div>
          </Form.Control>
          <Form.Help color="danger">
            {errors.schema?.message}
          </Form.Help>
        </Form.Field>

        <ApplicationConnectorsFormField form={form} />

        <Button.Group align="right">
          <Button color="primary" submit loading={isSubmitting}>
            {t('forms.create_application.buttons.create.label')}
          </Button>
        </Button.Group>
      </form>
    </Box>
  );
};

export default CreateApplicationFormView;
