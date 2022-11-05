import React from 'react';
import { Box, Block, Notification } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../hooks/locale';
import { SchemaDataType } from '../../../utils/schema';

interface Props {
  path: string
  type: SchemaDataType | null
}

const UnsupportedVisualizer: React.FC<Props> = ({ path, type }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.unsupported.title.text', { path })}
      </h3>

      <Block>
        <Notification className="unsupported-visualizer-notification" color="light">
          <FontAwesomeIcon size="5x" icon="face-frown" />

          <p>
            {t('common.data_vis.unsupported.description.text', { type: type ?? 'null' })}
          </p>
        </Notification>
      </Block>
    </Box>
  );
};

export default UnsupportedVisualizer;
