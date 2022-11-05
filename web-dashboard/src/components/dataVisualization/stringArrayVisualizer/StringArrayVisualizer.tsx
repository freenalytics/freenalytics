import React from 'react';
import { Block, Box, Table } from 'react-bulma-components';
import useLocale from '../../../hooks/locale';

interface Props {
  path: string
  data: string[][]
}

const StringArrayVisualizer: React.FC<Props> = ({ path, data }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.string_array.title.text', { path })}
      </h3>

      <Block>
        <Table.Container>
          <Table striped className="is-fullwidth">
            <thead>
              <tr>
                <th>
                  {path}
                </th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((entry, index) => (
                  <tr key={index}>
                    <td>
                      {
                        entry.map((innerEntry, index) => (
                          <span key={index} className="string-array-visualizer-item">
                            {innerEntry}
                          </span>
                        ))
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Table.Container>
      </Block>
    </Box>
  );
};

export default StringArrayVisualizer;
