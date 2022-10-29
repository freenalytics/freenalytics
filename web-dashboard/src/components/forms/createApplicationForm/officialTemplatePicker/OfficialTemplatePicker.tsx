import React from 'react';
import { Level, Box } from 'react-bulma-components';
import OfficialTemplateItem from './OfficialTemplateItem';
import templates from './templates';

const OfficialTemplatePicker = () => {
  return (
    <Box>
      <Level>
        <Level.Side>
          {
            templates.map((template, index) => (
              <OfficialTemplateItem key={index} {...template} />
            ))
          }
        </Level.Side>
      </Level>
    </Box>
  );
};

export default OfficialTemplatePicker;
