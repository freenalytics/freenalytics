import React from 'react';
import { Button } from 'react-bulma-components';
import { toast } from 'react-hot-toast';
import fileDownload from 'js-file-download';
import useLocale from '../../../../hooks/locale';
import useApi from '../../../../hooks/api';

interface Props {
  domain: string
}

const ExportDataButton: React.FC<Props> = ({ domain }) => {
  const { t } = useLocale();
  const { client } = useApi();

  const handleClick = async () => {
    try {
      const response = await client.application.getApplicationDataAsCsv(domain);
      const filename = response.headers['x-suggested-filename'] ?? 'data.csv';

      fileDownload(response.data, filename);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Button.Group align="right">
      <Button color="primary" onClick={handleClick}>
        {t('pages.application.entries.buttons.csv_export.label')}
      </Button>
    </Button.Group>
  );
};

export default ExportDataButton;
