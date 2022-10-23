import React from 'react';
import CodeBlock from '../codeBlock';
import useApi from '../../../hooks/api';

interface Props {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
}

const ApiUrlBlock: React.FC<Props> = ({ method, path }) => {
  const { client } = useApi();
  const text = `${method}\t${client.baseURL}/${path}`;

  return (
    <CodeBlock
      text={text}
      language="text"
    />
  );
};

export default ApiUrlBlock;
