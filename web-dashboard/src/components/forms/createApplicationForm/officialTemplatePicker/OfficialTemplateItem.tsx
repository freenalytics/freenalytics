import React from 'react';
import { Level, Card } from 'react-bulma-components';
import useLocale from '../../../../hooks/locale';
import { OfficialTemplate } from './templates';

interface Props extends OfficialTemplate {

}

const OfficialTemplateItem: React.FC<Props> = ({ nameKey }) => {
  const { t } = useLocale();

  return (
    <Level.Item>
      <Card>
        {t(nameKey)}
      </Card>
    </Level.Item>
  );
};

export default OfficialTemplateItem;
