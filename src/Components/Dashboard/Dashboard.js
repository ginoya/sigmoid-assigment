import DataTable from "./Datatable/Datatable";
import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";

const Dashboard = () => {

    
    const showDashboardContents = useSelector(state => state.dashboard.showDashboardContents)
    return (
        showDashboardContents ?
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DataTable />
                    </Grid>
                    <Grid item xs={6}>
                        <PieChart />
                    </Grid>
                    <Grid item xs={12}>
                        <BarChart />
                    </Grid>
                </Grid>
            </Box> : <></>
    )
}

export default Dashboard;