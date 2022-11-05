import React from 'react';
import objectPath from 'object-path';
import StringVisualizer from '../stringVisualizer';
import StringArrayVisualizer from '../stringArrayVisualizer';
import NumberVisualizer from '../numberVisualizer';
import NumberArrayVisualizer from '../numberArrayVisualizer';
import ObjectArrayVisualizer from '../objectArrayVisualizer';
import BooleanVisualizer from '../booleanVisualizer';
import BooleanArrayVisualizer from '../booleanArrayVisualizer';
import UnsupportedVisualizer from '../unsupportedVisualizer';
import { SchemaDataType } from '../../../utils/schema';

interface Props {
  path: string
  type: SchemaDataType | null
  data: { payload: object }[]
}

const DataVisualizer: React.FC<Props> = ({ path, type, data }) => {
  if (type === 'string') {
    const preparedData = data
      .map((entry) => objectPath.get(entry.payload, path))
      .filter(Boolean);

    return (
      <StringVisualizer path={path} data={preparedData} />
    );
  }

  if (type === 'string[]') {
    return (
      <StringArrayVisualizer />
    );
  }

  if (type === 'number' || type === 'integer') {
    return (
      <NumberVisualizer />
    );
  }

  if (type === 'number[]' || type === 'integer[]') {
    return (
      <NumberArrayVisualizer />
    );
  }

  if (type === 'object[]') {
    return (
      <ObjectArrayVisualizer />
    );
  }

  if (type === 'boolean') {
    return (
      <BooleanVisualizer />
    );
  }

  if (type === 'boolean[]') {
    return (
      <BooleanArrayVisualizer />
    );
  }

  return (
    <UnsupportedVisualizer />
  );
};

export default DataVisualizer;
