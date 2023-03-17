import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PieChart = () => {
    const pieChartData = useSelector(state => state.dashboard.pieChartData)
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Pie Chart'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: pieChartData.data.map((slice, index) => {
                return {
                    name: slice.advertiserId,
                    y: parseInt(slice.CM001_percent),
                    sliced: index === 0 ? true : false,
                    selected: index === 0 ? true : false
                }
            })
        }]
    };
    return (
        pieChartData.loading ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> :
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
    )
}

export default PieChart;