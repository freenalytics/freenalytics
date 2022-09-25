import React from 'react';
import { Audio } from 'react-loader-spinner';

interface Props {
  size?: number | string
}

const Loading: React.FC<Props> = ({
  size = 50
}) => {
  return (
    <div className="loading-spinner">
      <Audio
        height={size}
        width={size}
        color="#00d1b2"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loading;
