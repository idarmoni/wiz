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
import { Scatter } from 'react-chartjs-2';
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

export function ScatterChart(props) {

    const options = {

        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'scatter chart',
            },
        },
    };
    var datasets = []
    var i = 0
    props.LineCharts.forEach(x => {
        i++
        const dsColor = utils.namedColor(i);

        datasets.push({
            label: x.name,
            data: x.data,
            borderColor: dsColor,
            showLine: true,
            backgroundColor: utils.transparentize(dsColor, 0.5),
        })
    })

    const data = {
        datasets: datasets
    };

    return <Scatter options={options} data={data} />
        ;
}
