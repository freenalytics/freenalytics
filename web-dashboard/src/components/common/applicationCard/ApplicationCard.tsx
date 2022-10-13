import React from 'react';
import { Card, Media, Heading, Content } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useLocale from '../../../hooks/locale';
import { ApplicationModel, ApplicationType } from '../../../services/api/ApplicationService';
import { DYNAMIC_PROTECTED_ROUTES } from '../../../constants/routes';

const TYPE_ICONS: Record<ApplicationType, IconProp> = {
  mobile: 'mobile-screen',
  web: 'earth-americas',
  server: 'server',
  desktop: 'desktop',
  other: 'robot'
};

interface Props extends ApplicationModel {

}

const ApplicationCard: React.FC<Props> = ({ name, domain, type, createdAt, lastModifiedAt }) => {
  const { t } = useLocale();

  return (
    <Link to={DYNAMIC_PROTECTED_ROUTES.applicationDashboard(domain)} className="application-card">
      <Card>
        <Card.Content>
          <Media>
            <Media.Item align="left">
              <FontAwesomeIcon size="3x" icon={TYPE_ICONS[type]} />
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
              <time dateTime={createdAt}>
                {t('common.application.card.created_at.text', { time: new Date(createdAt).toLocaleString() })}
              </time>
            </p>
            <p>
              <time dateTime={lastModifiedAt}>
                {t('common.application.card.last_modified.text', { time: new Date(lastModifiedAt).toLocaleString() })}
              </time>
            </p>
          </Content>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ApplicationCard;
