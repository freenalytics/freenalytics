import React from 'react';
import { ApplicationModel } from '../../../services/api/ApplicationService';

interface Props extends ApplicationModel {

}

const ApplicationCard: React.FC<Props> = ({ name, domain }) => {
  return (
    <div>
      {name} - {domain}
    </div>
  );
};

export default ApplicationCard;
