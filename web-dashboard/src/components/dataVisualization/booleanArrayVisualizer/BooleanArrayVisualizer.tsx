import React from 'react';
import { Box, Block } from 'react-bulma-components';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import useLocale from '../../../hooks/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const parseData = (data: boolean[][]) => {
  const frequencies = data.reduce((acc: { true: number[], false: number[] }, cur: boolean[]) => {
    const currentFrequencies = cur.reduce((acc: [number, number], cur: boolean) => {
      acc[cur ? 0 : 1] += 1;
      return acc;
    }, [0, 0]);

    acc.true.push(currentFrequencies[0]);
    acc.false.push(currentFrequencies[1]);

    return acc;
  }, { true: [], false: [] });

  return {
    labels: data.map((_, idx) => idx + 1),
    datasets: [
      {
        label: 'true',
        data: frequencies.true,
        backgroundColor: 'hsla(141, 53%, 53%, 30%)',
        borderColor: 'hsla(141, 53%, 53%, 80%)'
      },
      {
        label: 'false',
        data: frequencies.false,
        backgroundColor: 'hsla(348, 100%, 61%, 30%)',
        borderColor: 'hsla(348, 100%, 61%, 80%)'
      }
    ]
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
  data: boolean[][]
}

const BooleanArrayVisualizer: React.FC<Props> = ({ path, data }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.boolean_array.title.text', { path })}
      </h3>

      <Block>
        <Chart
          type="bar"
          data={parseData(data)}
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

export default BooleanArrayVisualizer;
