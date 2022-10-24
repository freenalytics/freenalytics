import React from 'react';
import { Button, Block } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationData } from '../../../services/api/Client';

interface Props extends PaginationData {
  onPageChange: (n: number) => void
}

const PageSelector: React.FC<Props> = ({ onPageChange, previous, next, isLast }) => {
  const handlePreviousClick = () => {
    onPageChange(previous);
  };

  const handleNextClick = () => {
    onPageChange(next);
  };

  return (
    <Block>
      <Button.Group align="center">
        <Button onClick={handlePreviousClick} disabled={previous === 0}>
          <FontAwesomeIcon icon="arrow-left" />
        </Button>
        <Button onClick={handleNextClick} disabled={isLast}>
          <FontAwesomeIcon icon="arrow-right" />
        </Button>
      </Button.Group>
    </Block>
  );
};

export default PageSelector;
