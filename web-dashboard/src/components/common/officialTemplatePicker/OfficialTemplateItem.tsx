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
    <Level.Item>
      <Card>
        <Card.Content alignItems="center">
          <ApplicationTypeIcon type={type} />

          <Heading size={6}>
            {t(nameKey)}
          </Heading>
          <Heading subtitle>
            {t(descriptionKey)}
          </Heading>
        </Card.Content>
      </Card>
    </Level.Item>
  );
};

export default OfficialTemplateItem;
