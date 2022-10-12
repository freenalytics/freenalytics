import React from 'react';
import { Block, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../hooks/locale';

const EmptyContentAlert = () => {
  const { t } = useLocale();

  return (
    <Block className="empty-content-alert" backgroundColor="white-ter" textColor="grey-dark">
      <FontAwesomeIcon className="svg-icon" size="4x" icon={['far', 'face-surprise']} />
      <Heading subtitle size={6}>
        {t('common.alerts.empty.description.text')}
      </Heading>
    </Block>
  );
};

export default EmptyContentAlert;
