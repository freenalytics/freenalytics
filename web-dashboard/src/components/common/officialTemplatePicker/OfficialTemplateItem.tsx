import React from 'react';
import { Level, Card, Heading } from 'react-bulma-components';
import ApplicationTypeIcon from '../../common/applicationTypeIcon';
import useLocale from '../../../hooks/locale';
import { OfficialTemplate } from './templates';

interface Props extends OfficialTemplate {

}

const OfficialTemplateItem: React.FC<Props> = ({ nameKey, descriptionKey, type }) => {
  const { t } = useLocale();

  return (
    <Level.Item className="official-template-item">
      <Card title={t(descriptionKey)}>
        <Card.Content>
          <ApplicationTypeIcon type={type} />

          <Heading size={5} my={4}>
            {t(nameKey)}
          </Heading>
          <p className="description">
            {t(descriptionKey)}
          </p>
        </Card.Content>
      </Card>
    </Level.Item>
  );
};

export default OfficialTemplateItem;
