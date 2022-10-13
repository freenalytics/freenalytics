import React from 'react';
import { Columns } from 'react-bulma-components';
import ApplicationCard from '../../../common/applicationCard';
import EmptyContentAlert from '../../../common/emptyContentAlert';
import { ApplicationModel } from '../../../../services/api/ApplicationService';

interface Props {
  applications: ApplicationModel[]
}

const ApplicationCardGroup: React.FC<Props> = ({ applications }) => {
  if (applications.length < 1) {
    return (
      <EmptyContentAlert />
    );
  }

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
            fullhd={{ size: 4 }}
          >
            <ApplicationCard {...application} />
          </Columns.Column>
        ))
      }
    </Columns>
  );
};

export default ApplicationCardGroup;
