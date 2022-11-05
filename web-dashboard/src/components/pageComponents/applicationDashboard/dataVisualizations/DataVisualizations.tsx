import React from 'react';
import { Columns } from 'react-bulma-components';
import DataVisualizer from '../../../dataVisualization/dataVisualizer';
import { getPathWithTypeForSchema } from '../../../../utils/schema';

interface Props {
  schema: object
  data: object[]
}

const DataVisualizations: React.FC<Props> = ({ schema, data }) => {
  const schemaTypes = getPathWithTypeForSchema(schema);

  return (
    <Columns>
      {
        Object.entries(schemaTypes).map(([path, type]) => (
          <Columns.Column
            key={path}
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            widescreen={{ size: 6 }}
            fullhd={{ size: 6 }}
          >
            <DataVisualizer path={path} type={type} data={data} />
          </Columns.Column>
        ))
      }
    </Columns>
  );
};

export default DataVisualizations;
