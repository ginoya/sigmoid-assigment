import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import './Datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_RANGE_DATA } from '../Redux/rangeReducer';
import { FETCH_DASHBOARD_DATA } from '../Redux/dashboardReducer';
import Dashboard from '../Dashboard/Dashboard';

function DatePickerValue() {

    const range = useSelector(state => state.range.range)
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dashboardData, setDashboardData] = useState({ visible: false, error: "" })

    useEffect(() => {
        dispatch({
            type: FETCH_RANGE_DATA,
            payload: {
                "organization": "DemoTest",
                "view": "Auction"
            }
        })
    }, [])

    useEffect(() => {
        if (startDate && endDate) {
            if (startDate.isAfter(endDate)) {
                setDashboardData({ visible: false, error: "Invalid date selection. Please select valid dates." })
            }
            else {
                if (dashboardData.visible) {
                    dispatch({ type: FETCH_DASHBOARD_DATA, payload: { startDate, endDate } })
                }
                setDashboardData({ visible: true, error: "" })
            }
        }
    }, [startDate, endDate]);

    const handleClick = () => {
        dispatch({ type: FETCH_DASHBOARD_DATA, payload: { startDate, endDate } })
    }
    return (
        <>
            <div className='date-picker-cpntainer'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='start-date-container'
                        label="Start Date"
                        minDate={dayjs(range?.startDate)}
                        maxDate={dayjs(range?.endDate)}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DatePicker
                        className='end-date-container'
                        label="End Date"
                        minDate={dayjs(range?.startDate)}
                        maxDate={dayjs(range?.endDate)}
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                    />
                </LocalizationProvider>
                {dashboardData.visible && <Button variant="contained" onClick={() => handleClick()}>View Dashboard</Button>}
            </div>
            <div className='error'>{dashboardData.error}</div>
            {dashboardData.visible && <Dashboard />}
        </>
    );
}

export default React.memo(DatePickerValue);