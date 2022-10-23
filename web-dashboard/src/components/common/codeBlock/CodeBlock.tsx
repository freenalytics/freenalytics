import React from 'react';
import { CodeBlock as ReactCodeBlock, atomOneDark } from 'react-code-blocks';

interface Props {
  text: string
  language: string
  showLineNumbers?: boolean
}

const CodeBlock: React.FC<Props> = ({ text, language, showLineNumbers = false }) => {
  return (
    <div className="code-block-container">
      <ReactCodeBlock
        text={text}
        language={language}
        theme={atomOneDark}
        showLineNumbers={showLineNumbers}
      />
    </div>
  );
};

export default CodeBlock;
