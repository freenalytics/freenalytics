import React from 'react';
import { Box, Table } from 'react-bulma-components';
import objectPath from 'object-path';
import { ApplicationDataModel } from '../../../services/api/ApplicationService';
import useLocale from '../../../hooks/locale';
import { getPathForSchema } from '../../../utils/schema';
import { getFormattedDate } from '../../../utils/date';

interface Props {
  data: ApplicationDataModel[]
  schema: object
  startIndex: number
}

const EntryTableView: React.FC<Props> = ({ data, schema, startIndex }) => {
  const { t, currentLocale } = useLocale();

  const schemaPaths = getPathForSchema(schema);
  const columns = ['#', t('common.data_vis.entry_table.columns.createdAt.text'), ...schemaPaths];

  return (
    <Box>
      <Table.Container>
        <Table striped>
          <thead>
            <tr>
              {
                columns.map((col) => (
                  <th key={col}>
                    {col}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((entry, index) => (
                <tr key={index}>
                  <th>
                    {index + startIndex}
                  </th>
                  <td>
                    {getFormattedDate(entry.createdAt, currentLocale)}
                  </td>
                  {
                    schemaPaths.map((path, index) => {
                      const cell = objectPath.get(entry.payload, path);

                      return (
                        <td key={`${path}-${index}`}>
                          {Array.isArray(cell) ? `[${cell.join(', ')}]` : cell}
                        </td>
                      );
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Table.Container>
    </Box>
  );
};

export default EntryTableView;
