import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
);

const AVAILABLE_COLORS = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 205, 86, 0.5)',
  'rgba(46, 204, 113, 0.5)',
  'rgba(155, 89, 182, 0.5)',
  'rgba(52, 73, 94, 0.5)',
  'rgba(26, 188, 156, 0.5)',
  'rgba(230, 126, 34, 0.5)',
  'rgba(189, 195, 199, 0.5)',
  'rgba(241, 196, 15, 0.5)',
  'rgba(149, 165, 166, 0.5)',
  'rgba(41, 128, 185, 0.5)',
  'rgba(192, 57, 43, 0.5)',
  'rgba(243, 156, 18, 0.5)',
  'rgba(44, 62, 80, 0.5)',
  'rgba(39, 174, 96, 0.5)',
  'rgba(22, 160, 133, 0.5)',
  'rgba(127, 140, 141, 0.5)',
];

const BORDER_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(46, 204, 113)',
  'rgb(155, 89, 182)',
  'rgb(52, 73, 94)',
  'rgb(26, 188, 156)',
  'rgb(230, 126, 34)',
  'rgb(189, 195, 199)',
  'rgb(241, 196, 15)',
  'rgb(149, 165, 166)',
  'rgb(41, 128, 185)',
  'rgb(192, 57, 43)',
  'rgb(243, 156, 18)',
  'rgb(44, 62, 80)',
  'rgb(39, 174, 96)',
  'rgb(22, 160, 133)',
  'rgb(127, 140, 141)',
];

const DEFAULT_LEGEND_PLUGIN_OPTIONS = {
  display: false,
  position: 'top'
};

const DEFAULT_TITLE_PLUGIN_OPTINS = {
  display: false,
  text: undefined,
};

export default function BarChart({ labels, datasets, title }) {
  const dataProps = { labels };

  dataProps.datasets = datasets.map((dataset) => ({
    ...dataset,
    backgroundColor: AVAILABLE_COLORS, 
    borderColor: BORDER_COLORS,
    borderWidth: 1
  }));

  const plugins = {
    legend: { ...DEFAULT_LEGEND_PLUGIN_OPTIONS },
    title: { ...DEFAULT_TITLE_PLUGIN_OPTINS },
  }

  if (typeof title === 'string') {
    plugins.title.text = title;
    plugins.title.display = true;
  }

  return (
    <Bar data={ dataProps } height={300} options={{ 
      plugins: plugins,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: function(label) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          }
        },
      }
    }} />
  )
}
