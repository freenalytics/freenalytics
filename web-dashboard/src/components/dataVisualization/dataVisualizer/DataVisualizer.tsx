import React from 'react';
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
  data: object[]
}

// @ts-ignore
const DataVisualizer: React.FC<Props> = ({ path, type, data }) => {
  if (type === 'string') {
    return (
      <StringVisualizer />
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
