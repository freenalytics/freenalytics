import React from 'react';
import { Level, Card, Heading } from 'react-bulma-components';
import ApplicationTypeIcon from '../../common/applicationTypeIcon';
import useLocale from '../../../hooks/locale';
import { OfficialTemplate, OfficialTemplateForm } from './templates';

interface Props extends OfficialTemplate {
  onClick: (data: OfficialTemplateForm) => void
}

const OfficialTemplateItem: React.FC<Props> = ({ onClick, nameKey, descriptionKey, type, schema, connectors }) => {
  const { t } = useLocale();

  const handleClick = () => {
    onClick({ type, schema, connectors });
  };

  return (
    <Level.Item className="official-template-item">
      <Card title={t(descriptionKey)} onClick={handleClick}>
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
