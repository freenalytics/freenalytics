import React from 'react';
import jsf from 'json-schema-faker';
import CodeBlock from '../../../common/codeBlock';

interface Props {
  schema: object
}

const DataExamplePreview: React.FC<Props> = ({ schema }) => {
  const example = jsf({
    ...schema,
    additionalProperties: false
  });

  return (
    <CodeBlock
      text={JSON.stringify(example, null, 2)}
      language="json"
    />
  );
};

export default DataExamplePreview;
