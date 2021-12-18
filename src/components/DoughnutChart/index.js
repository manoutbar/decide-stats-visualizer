import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const AVAILABLE_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)'
];

const DEFAULT_DATASET_OPTIONS = {
  backgroundColor: AVAILABLE_COLORS,
  hoverOffset: 4,
};

const DEFAULT_LEGEND_PLUGIN_OPTIONS = {
  position: 'left'
};

const DEFAULT_TITLE_PLUGIN_OPTINS = {
  display: false,
  text: undefined,
};

const overrideIfUndefined = (evalValue, defaultValue) => 
  typeof evalValue === 'undefined' ? defaultValue : evalValue;

export default function DoughnutChart({ labels, datasets }) {
  const dataProps = { labels };

  dataProps.datasets = datasets.map((dataset) => ({
    ...dataset,
    ...Object.fromEntries(Object.entries(DEFAULT_DATASET_OPTIONS)
      .map(entry => [entry[0], overrideIfUndefined(dataset[entry[0]], entry[1])]))
  }));

  const plugins = {
    legend: { ... DEFAULT_LEGEND_PLUGIN_OPTIONS },
    title: { ...DEFAULT_TITLE_PLUGIN_OPTINS },
  };

  if (datasets.length === 1 && typeof datasets[0].label === 'string') {
    plugins.title.text = datasets[0].label;
    plugins.title.display = true;
  }

  return (
    <Doughnut data={ dataProps } height={300} options={{ 
      plugins: plugins,
      maintainAspectRatio: false,
    }} />
  )
}