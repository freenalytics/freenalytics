import React from 'react';
import { Block, Notification } from 'react-bulma-components';
import useLocale from '../../../../hooks/locale';

const ApplicationUpdatedAlert = () => {
  const { t } = useLocale();

  return (
    <Block>
      <Notification color="success">
        {t('pages.application.settings.success.description.text')}
      </Notification>
    </Block>
  );
};

export default ApplicationUpdatedAlert;
