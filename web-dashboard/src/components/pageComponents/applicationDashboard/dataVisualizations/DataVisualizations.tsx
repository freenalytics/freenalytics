import React from 'react';
import { getPathWithTypeForSchema } from '../../../../utils/schema';

interface Props {
  schema: object
  data: object[]
}

const DataVisualizations: React.FC<Props> = ({ schema, data }) => {
  return (
    <div>
      {JSON.stringify(getPathWithTypeForSchema(schema))}
      {JSON.stringify(data)}
    </div>
  );
};

export default DataVisualizations;
