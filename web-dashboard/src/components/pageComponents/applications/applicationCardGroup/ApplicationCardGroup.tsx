import React from 'react';
import { Columns } from 'react-bulma-components';
import ApplicationCard from '../../../common/applicationCard';
import { ApplicationModel } from '../../../../services/api/ApplicationService';

interface Props {
  applications: ApplicationModel[]
}

const ApplicationCardGroup: React.FC<Props> = ({ applications }) => {
  return (
    <Columns>
      {
        applications.map((application) => (
          <Columns.Column
            key={application.domain}
            mobile={{ size: 12 }}
            tablet={{ size: 6 }}
            desktop={{ size: 4 }}
            widescreen={{ size: 4 }}
            fullhd={{ size: 3 }}
          >
            <ApplicationCard {...application} />
          </Columns.Column>
        ))
      }
    </Columns>
  );
};

export default ApplicationCardGroup;
