import React from 'react';
import { SchemaDataType } from '../../../utils/schema';

interface Props {
  path: string
  type: SchemaDataType | null
  data: object[]
}

const DataVisualizer: React.FC<Props> = ({ path, type, data }) => {
  return (
    <div>
      {type} -- {path}
      <p style={{ display: 'none' }}>
        {JSON.stringify(data)}
      </p>
    </div>
  );
};

export default DataVisualizer;
