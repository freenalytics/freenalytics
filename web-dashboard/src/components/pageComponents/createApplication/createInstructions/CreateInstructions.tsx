import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';
import useLocale from '../../../../hooks/locale';

const CreateInstructions = () => {
  const { t } = useLocale();

  return (
    <Block className="create-instructions">
      <Notification color="info">
        <Heading size={4}>
          {t('pages.create_application.instructions.header.text')}
        </Heading>
        <p>
          {t('pages.create_application.instructions.description.1.text')}
        </p>
        <p>
          {t('pages.create_application.instructions.description.2.text')}
        </p>
        <p>
          {t('pages.create_application.instructions.description.3.text')}
        </p>
        <p>
          {t('pages.create_application.instructions.description.4.text')}
        </p>
        <p>
          {t('pages.create_application.instructions.description.5.text')}
        </p>
      </Notification>
    </Block>
  );
};

export default CreateInstructions;
