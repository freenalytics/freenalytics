import React from 'react';
import { Level, Box, Heading } from 'react-bulma-components';
import OfficialTemplateItem from './OfficialTemplateItem';
import useLocale from '../../../hooks/locale';
import templates, { OfficialTemplateForm } from './templates';

interface Props {
  onSelect?: (data: OfficialTemplateForm) => void
}

const OfficialTemplatePicker: React.FC<Props> = ({ onSelect }) => {
  const { t } = useLocale();

  const handleItemClick = (data: OfficialTemplateForm) => {
    if (onSelect) {
      onSelect(data);
    }
  };

  return (
    <Box className="official-template-picker">
      <Heading size={4}>
        {t('forms.create_application.official_templates.header.text')}
      </Heading>
      <Heading subtitle size={5}>
        {t('forms.create_application.official_templates.description.text')}
      </Heading>

      <Level>
        <Level.Side>
          {
            templates.map((template, index) => (
              <OfficialTemplateItem key={index} {...template} onClick={handleItemClick} />
            ))
          }
        </Level.Side>
      </Level>
    </Box>
  );
};

export default OfficialTemplatePicker;
