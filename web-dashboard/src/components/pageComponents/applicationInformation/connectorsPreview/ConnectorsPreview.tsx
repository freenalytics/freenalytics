import React from 'react';
import { Content } from 'react-bulma-components';
import useLocale from '../../../../hooks/locale';
import { ConnectorModel } from '../../../../services/api/ApplicationService';

interface Props {
  connectors: ConnectorModel[]
}

const ConnectorsPreview: React.FC<Props> = ({ connectors }) => {
  const { t } = useLocale();

  if (connectors.length < 1) {
    return (
      <p>
        {t('pages.application.information.connectors.empty.text')}
      </p>
    );
  }

  return (
    <Content>
      <p>
        {t('pages.application.information.connectors.description.text')}
      </p>

      <ul>
        {
          connectors.map(({ language, package_url }, index) => (
            <li key={index}>
              <a href={package_url}>
                {t('pages.application.information.connectors.connector.text', { language })}
              </a>
            </li>
          ))
        }
      </ul>
    </Content>
  );
};

export default ConnectorsPreview;
