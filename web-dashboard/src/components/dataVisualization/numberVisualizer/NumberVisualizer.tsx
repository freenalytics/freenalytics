import React from 'react';
import { Box, Block } from 'react-bulma-components';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import useLocale from '../../../hooks/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const parseData = (data: number[], label: string) => {
  return {
    labels: data.map((_, idx) => idx + 1),
    datasets: [{
      label,
      data,
      fill: true,
      backgroundColor: 'hsla(171, 100%, 41%, 30%)'
    }]
  };
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    yAxis: {
      ticks: {
        display: true
      }
    },
    xAxis: {
      ticks: {
        display: false
      }
    }
  },
  elements: {
    point: {
      backgroundColor: 'hsl(171, 100%, 41%)',
      borderColor: 'hsl(171, 100%, 41%)',
      radius: 2,
      hoverRadius: 4
    },
    line: {
      borderColor: 'hsla(171, 100%, 41%, 50%)'
    }
  }
};

interface Props {
  path: string
  data: number[]
}

const NumberVisualizer: React.FC<Props> = ({ path, data }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.number.title.text', { path })}
      </h3>

      <Block>
        <Chart
          type="line"
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

export default NumberVisualizer;
