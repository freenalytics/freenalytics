import React from 'react';
import { Button, Form, Box } from 'react-bulma-components';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import useLocale from '../../../../hooks/locale';
import useFormHelper from '../../../../hooks/formHelper';

const getFieldName = (field: string, index: number) => {
  return `connectors.${index}.${field}`;
};

const getError = (errors: any, field: string, index: number) => {
  const indexError = errors.connectors && errors.connectors.at(index);
  return indexError && indexError[field]?.message;
};

interface Props {
  form: UseFormReturn<any>
}

const ApplicationConnectorsFormField: React.FC<Props> = ({ form }) => {
  const { t } = useLocale();
  const { getValues, control, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'connectors'
  });
  const { handleChangeWithValidation } = useFormHelper(form);

  const handleAdd = () => {
    append({
      package_url: '',
      language: ''
    });
  };

  const handleRemove = (index: number) => () => {
    remove(index);
  };

  return (
    <Form.Field>
      <Form.Label>
        {t('common.form.application_connectors_form_field.label')}
      </Form.Label>
      {
        fields.map((field, index) => (
          <Box key={field.id}>
            <Button remove onClick={handleRemove(index)} style={{ float: 'right' }} />

            <Form.Field>
              <Form.Label>
                {t('common.form.application_connectors_form_field.package_url.label')}
              </Form.Label>
              <Form.Control>
                <Form.Input
                  type="url"
                  name={getFieldName('package_url', index)}
                  placeholder={getValues(getFieldName('package_url', index))}
                  onChange={handleChangeWithValidation}
                />
              </Form.Control>
              <Form.Help color="danger">
                {getError(errors, 'package_url', index)}
              </Form.Help>
            </Form.Field>

            <Form.Field>
              <Form.Label>
                {t('common.form.application_connectors_form_field.language.label')}
              </Form.Label>
              <Form.Control>
                <Form.Input
                  type="text"
                  name={getFieldName('language', index)}
                  placeholder={getValues(getFieldName('language', index))}
                  onChange={handleChangeWithValidation}
                />
              </Form.Control>
              <Form.Help color="danger">
                {getError(errors, 'language', index)}
              </Form.Help>
            </Form.Field>
          </Box>
        ))
      }

      <Button color="primary" onClick={handleAdd}>
        {t('common.form.application_connectors_form_field.buttons.add.label')}
      </Button>
    </Form.Field>
  );
};

export default ApplicationConnectorsFormField;
