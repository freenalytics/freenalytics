import React, { ChangeEvent, useEffect } from 'react';
import { Form } from 'react-bulma-components';
import useLocale from '../../../../hooks/locale';
import { MessageKey } from '../../../../i18n';
import { VALID_APPLICATION_TYPES, ApplicationType } from '../../../../services/api/ApplicationService';

const TYPE_TEXT: Record<ApplicationType, MessageKey> = {
  mobile: 'common.form.application_type_picker.mobile.text',
  web: 'common.form.application_type_picker.web.text',
  server: 'common.form.application_type_picker.server.text',
  desktop: 'common.form.application_type_picker.desktop.text',
  other: 'common.form.application_type_picker.other.text'
};

interface Props {
  name: string
  required?: boolean
  onChange: (e: ChangeEvent<any>) => void
  defaultValue?: string
}

const ApplicationTypePicker: React.FC<Props> = ({ name, required = false, onChange, defaultValue }) => {
  const { t } = useLocale();

  useEffect(() => {
    onChange({ currentTarget: { name, value: defaultValue ?? VALID_APPLICATION_TYPES[0] } } as unknown as ChangeEvent<any>);
  }, []);

  return (
    <Form.Select name={name} required={required} onChange={onChange} defaultValue={defaultValue ?? VALID_APPLICATION_TYPES[0]}>
      {
        VALID_APPLICATION_TYPES.map((type) => (
          <option key={type} value={type}>
            {t(TYPE_TEXT[type])}
          </option>
        ))
      }
    </Form.Select>
  );
};

export default ApplicationTypePicker;
