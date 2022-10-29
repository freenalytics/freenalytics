import React from 'react';
import { Heading, Box, Level } from 'react-bulma-components';
import DeleteApplicationButton from '../deleteApplicationButton';
import useLocale from '../../../../hooks/locale';

interface Props {
  domain: string
}

const SettingsDangerZone: React.FC<Props> = ({ domain }) => {
  const { t } = useLocale();

  return (
    <Box>
      <Heading size={4}>
        {t('pages.application.settings.danger.header.text')}
      </Heading>

      <Level>
        <Level.Side align="left">
          <p>
            {t('pages.application.settings.danger.delete.text')}
          </p>
        </Level.Side>
        <Level.Side align="right">
          <DeleteApplicationButton domain={domain} />
        </Level.Side>
      </Level>
    </Box>
  );
};

export default SettingsDangerZone;
