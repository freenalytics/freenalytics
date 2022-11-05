import React from 'react';

interface Props {
  domain: string
}

const DataDashboard: React.FC<Props> = ({ domain }) => {
  return (
    <div>
      {domain}
    </div>
  );
};

export default DataDashboard;
