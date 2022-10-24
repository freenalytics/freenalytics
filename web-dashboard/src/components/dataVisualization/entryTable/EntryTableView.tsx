import React from 'react';
import { PaginationData } from '../../../services/api/Client';
import { ApplicationDataModel } from '../../../services/api/ApplicationService';

interface Props extends PaginationData {
  data: ApplicationDataModel[]
}

const EntryTableView: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default EntryTableView;
