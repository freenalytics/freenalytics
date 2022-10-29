import React from 'react';
import { Level, Box } from 'react-bulma-components';
import OfficialTemplateItem from './OfficialTemplateItem';
import templates, { OfficialTemplateForm } from './templates';

interface Props {
  onSelect?: (data: OfficialTemplateForm) => void
}

const OfficialTemplatePicker: React.FC<Props> = ({ onSelect }) => {
  const handleItemClick = (data: OfficialTemplateForm) => {
    if (onSelect) {
      onSelect(data);
    }
  };

  return (
    <Box className="official-template-picker">
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
