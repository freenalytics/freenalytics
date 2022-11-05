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
  const mappedData = data.map((entry) => objectPath.get(entry.payload, path)).reverse();

  if (type === 'string') {
    return (
      <StringVisualizer path={path} data={mappedData.filter(Boolean)} />
    );
  }

  if (type === 'string[]') {
    return (
      <StringArrayVisualizer path={path} data={mappedData.filter(Boolean)} />
    );
  }

  if (type === 'number' || type === 'integer') {
    return (
      <NumberVisualizer path={path} data={mappedData.filter((n) => !isNaN(n))} />
    );
  }

  if (type === 'number[]' || type === 'integer[]') {
    return (
      <NumberArrayVisualizer path={path} data={mappedData.filter(Boolean)} />
    );
  }

  if (type === 'object[]') {
    return (
      <ObjectArrayVisualizer />
    );
  }

  if (type === 'boolean') {
    return (
      <BooleanVisualizer path={path} data={mappedData.filter((e) => e !== undefined)} />
    );
  }

  if (type === 'boolean[]') {
    return (
      <BooleanArrayVisualizer path={path} data={mappedData.filter(Boolean)} />
    );
  }

  return (
    <UnsupportedVisualizer />
  );
};

export default DataVisualizer;
