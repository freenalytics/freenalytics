import React from 'react';
import ApplicationCard from '../../../common/applicationCard';
import { ApplicationModel } from '../../../../services/api/ApplicationService';

interface Props {
  applications: ApplicationModel[]
}

const ApplicationCardGroup: React.FC<Props> = ({ applications }) => {
  if (applications.length < 1) {
    return (
      <div>
        empty
      </div>
    );
  }

  return (
    <div>
      {
        applications.map((application) => (
          <ApplicationCard key={application.domain} {...application} />
        ))
      }
    </div>
  );
};

export default ApplicationCardGroup;
