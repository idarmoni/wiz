import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import * as utils from './utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart(props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'line chart',
      },
    },
  };
  // var charts = props.LineCharts||[]
  console.log('props.LineCharts',props.LineCharts)
  if(props.LineCharts.length==0)return;
  const max = Math.max(...props.LineCharts.map(x=>x.data.length))
  const labels = [...Array(max).keys()]
  var datasets = []
  var i = 0
  props.LineCharts.forEach(x => {
    i++
    const dsColor = utils.namedColor(i);

    datasets.push({
      label: x.name,
      data: x.data,
      borderColor: dsColor,
      backgroundColor: utils.transparentize(dsColor, 0.5),
    })
  })

  const data = {
    labels,
    datasets: datasets
  };

  return <Line options={options} data={data} />
    ;
}
