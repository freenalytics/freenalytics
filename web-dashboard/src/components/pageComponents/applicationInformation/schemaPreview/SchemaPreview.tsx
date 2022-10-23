import React from 'react';
import CodeBlock from '../../../common/codeBlock';

interface Props {
  rawSchema: string
}

const SchemaPreview: React.FC<Props> = ({ rawSchema }) => {
  return (
    <CodeBlock
      text={rawSchema}
      language="yaml"
    />
  );
};

export default SchemaPreview;
