import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const BarChart = () => {
    const barchartData = useSelector(state => state.dashboard.barChartData)
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bar Chart'
        },
        xAxis: {
            categories: barchartData.data.map(row => row.appSiteId),
            crosshair: true
        },
        series: [
            {
                data: barchartData.data.map(row => parseInt(row.impressions_offered))
            }
        ]
    };
    return (
        barchartData.loading ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> :
            <div >
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>)
}

export default BarChart;