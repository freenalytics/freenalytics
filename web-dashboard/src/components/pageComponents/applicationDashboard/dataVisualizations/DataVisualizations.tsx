import React from 'react';
import { Content } from 'react-bulma-components';
import DataVisualizer from '../../../dataVisualization/dataVisualizer';
import { getPathWithTypeForSchema } from '../../../../utils/schema';

interface Props {
  schema: object
  data: object[]
}

const DataVisualizations: React.FC<Props> = ({ schema, data }) => {
  const schemaTypes = getPathWithTypeForSchema(schema);

  return (
    <Content>
      {
        Object.entries(schemaTypes).map(([path, type]) => (
          <DataVisualizer key={path} path={path} type={type} data={data} />
        ))
      }
    </Content>
  );
};

export default DataVisualizations;
