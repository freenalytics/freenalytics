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

const colors = [
  {
    color: 'hsl(171, 100%, 41%)',
    background: 'hsla(171, 100%, 41%, 30%)'
  },
  {
    color: 'hsl(217, 71%, 53%)',
    background: 'hsla(217, 71%, 53%, 30%)'
  },
  {
    color: 'hsl(204, 86%, 53%)',
    background: 'hsla(204, 86%, 53%, 30%)'
  },
  {
    color: 'hsl(141, 53%, 53%)',
    background: 'hsla(141, 53%, 53%, 30%)'
  },
  {
    color: 'hsl(48, 100%, 67%)',
    background: 'hsla(48, 100%, 67%, 30%)'
  },
  {
    color: 'hsl(348, 100%, 61%)',
    background: 'hsla(348, 100%, 61%, 30%)'
  }
];

const parseData = (data: number[][], label: string) => {
  const maxEntrySize = data.reduce((acc: number, cur: number[]) => {
    return acc > cur.length ? acc : cur.length;
  }, 0);

  return {
    labels: data.map((_, idx) => idx + 1),
    datasets: new Array(maxEntrySize).fill(null).map((_, idx) => ({
      label: `${label}-${idx}`,
      data: data.map((entry) => entry[idx] ?? null),
      fill: true,
      borderColor: colors[idx % colors.length].color,
      backgroundColor: colors[idx % colors.length].background
    }))
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
      radius: 2,
      hoverRadius: 4
    },
    line: {
      borderColor: 'hsl(0, 0%, 71%)'
    }
  }
};

interface Props {
  path: string
  data: number[][]
}

const NumberArrayVisualizer: React.FC<Props> = ({ path, data }) => {
  const { t } = useLocale();

  return (
    <Box className="data-visualizer">
      <h3 className="data-visualizer-title">
        {t('common.data_vis.number_array.title.text', { path })}
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

export default NumberArrayVisualizer;
