import React, { Fragment } from 'react';
import { Button, Dropdown } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocale from '../../../../hooks/locale';

interface Props {
  onRefresh: () => void
  onLimitChange: (limit: number) => void
  limitOptions?: number[]
}

const DataDashboardHeader: React.FC<Props> = ({
  onRefresh,
  onLimitChange,
  limitOptions = [25, 50, 75, 100]
}) => {
  const { t } = useLocale();

  return (
    <Button.Group align="right" my={4}>
      <Button onClick={onRefresh} color="primary" title={t('pages.application.dashboard.header.refresh.description.text')}>
        <FontAwesomeIcon icon="refresh" />
      </Button>

      <Dropdown
        color=""
        right
        onChange={onLimitChange}
        icon={<FontAwesomeIcon icon="angle-down" />}
        label={
          <Fragment>
            <FontAwesomeIcon icon="hashtag" />
            <span style={{ margin: '0 0.5rem' }}>
              {t('pages.application.dashboard.header.limit_options.title.text')}
            </span>
          </Fragment>
        }
      >
        {
          limitOptions.map((limit, index) => (
            <Dropdown.Item key={index} value={limit} renderAs="a">
              {t('pages.application.dashboard.header.limit_options.item.text', { limit })}
            </Dropdown.Item>
          ))
        }
      </Dropdown>
    </Button.Group>
  );
};

export default DataDashboardHeader;
