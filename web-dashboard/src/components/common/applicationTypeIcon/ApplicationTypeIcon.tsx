import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ApplicationType } from '../../../services/api/ApplicationService';

const TYPE_ICONS: Record<ApplicationType, IconProp> = {
  mobile: 'mobile-screen',
  web: 'earth-americas',
  server: 'server',
  desktop: 'desktop',
  other: 'robot'
};

interface Props {
  type: ApplicationType
}

const ApplicationTypeIcon: React.FC<Props> = ({ type }) => {
  return (
    <FontAwesomeIcon size="3x" icon={TYPE_ICONS[type]} />
  );
};

export default ApplicationTypeIcon;
