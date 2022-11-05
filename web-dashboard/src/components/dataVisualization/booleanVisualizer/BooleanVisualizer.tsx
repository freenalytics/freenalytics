import React from 'react';
import { Box, Block } from 'react-bulma-components';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Legend
} from 'chart.js';
import useLocale from '../../../hooks/locale';

ChartJS.register(
  ArcElement,
  Legend
);

const parseData = (data: boolean[], label: string) => {
  const frequencies = data.reduce((acc: [number, number], cur: boolean) => {
    acc[cur ? 0 : 1] += 1;
    return acc;
  }, [0, 0]);

  return {
    labels: ['true', 'false'],
    datasets: [{
      label,
      data: frequencies,
      backgroundColor: ['hsla(141, 53%, 53%, 30%)', 'hsla(348, 100%, 61%, 30%)'],
      borderColor: ['hsla(141, 53%, 53%, 80%)', 'hsla(348, 100%, 61%, 80%)']
    }]
  };
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true
    }
  }
};

interface Props {
  path: string
  data: boolean[]
}

const BooleanVisualizer: React.FC<Props> = ({ path, data }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.boolean.title.text', { path })}
      </h3>

      <Block>
        <Chart
          type="pie"
          data={parseData(data, path)}
          options={options}
          key={path}
          datasetIdKey={path}
          id={path}
          redraw={false}
        />
      </Block>
    </Box>
  );
};

export default BooleanVisualizer;
