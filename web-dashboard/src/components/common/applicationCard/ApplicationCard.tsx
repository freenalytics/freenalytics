import React from 'react';
import { Card, Media, Heading, Content } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../hooks/locale';
import { ApplicationModel } from '../../../services/api/ApplicationService';
import { DYNAMIC_PROTECTED_ROUTES } from '../../../constants/routes';

const EXAMPLE_DATE = '2022-09-22T19:25:37.751Z';

interface Props extends ApplicationModel {

}

const ApplicationCard: React.FC<Props> = ({ name, domain }) => {
  const { t } = useLocale();

  return (
    <Link to={DYNAMIC_PROTECTED_ROUTES.applicationDashboard(domain)} className="application-card">
      <Card>
        <Card.Content>
          <Media>
            <Media.Item align="left">
              <FontAwesomeIcon size="3x" icon="server" />
            </Media.Item>
            <Media.Item>
              <Heading size={4}>
                {name}
              </Heading>
              <Heading subtitle size={6}>
                {domain}
              </Heading>
            </Media.Item>
          </Media>
          <Content>
            <p>
              <time dateTime={EXAMPLE_DATE}>
                {t('common.application.card.created_at.text', { time: new Date(EXAMPLE_DATE).toLocaleString() })}
              </time>
            </p>
            <p>
              <time dateTime={EXAMPLE_DATE}>
                {t('common.application.card.last_modified.text', { time: new Date(EXAMPLE_DATE).toLocaleString() })}
              </time>
            </p>
          </Content>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ApplicationCard;
