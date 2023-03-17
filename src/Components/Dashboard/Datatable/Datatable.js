import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DataTable = () => {
    const tableData = useSelector(state => state.dashboard.tableData)
    const columns = [
        { field: 'publisherId', headerName: 'Publisher', width: 300 },
        { field: 'impressions_offered', headerName: 'Impressions', width: 300 },
    ];
    return (
        tableData.loading ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> :
            <div >
                <div style={{ height: 500, width: "90%", marginLeft: "5%" }}>
                    <DataGrid rows={tableData.data} columns={columns} />
                </div>
            </div>
    )
}

export default DataTable;