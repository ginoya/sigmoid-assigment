import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import './Datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_RANGE_DATA } from '../../redux/rangeReducer';
import { FETCH_DASHBOARD_DATA } from '../../redux/dashboardReducer';
import Dashboard from '../Dashboard/Dashboard';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function DatePickerValue() {
    const range = useSelector(state => state.range.range)
    const isUnauthotorize = useSelector(state => state.range.isUnauthotorize)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isUnauthotorize){
            navigate('/')
        }
    },[isUnauthotorize])
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dashboardData, setDashboardData] = useState({ visible: false, error: "", clicked:false })

    useEffect(()=>{
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            navigate('/')
        }
        else{
            dispatch({
                type: FETCH_RANGE_DATA,
                payload: {
                    "organization": "DemoTest",
                    "view": "Auction"
                }
            })
        }
    },[])

    useEffect(() => {
        if (startDate && endDate) {
            if (startDate.isAfter(endDate)) {
                setDashboardData({...dashboardData, visible: false, error: "Invalid date selection. Please select valid dates." })
            }
            else {
                if (dashboardData.clicked) {
                    dispatch({ type: FETCH_DASHBOARD_DATA, payload: { startDate, endDate } })
                }
                setDashboardData({ ...dashboardData, visible: true, error: "" })
            }
        }
    }, [startDate, endDate]);

    const handleClick = () => {
        setDashboardData({...dashboardData,clicked:true})
        dispatch({ type: FETCH_DASHBOARD_DATA, payload: { startDate, endDate } })
    }
    return (
        <>
            <div className='date-picker-cpntainer'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        style={{width:"320px",margin:"10px"}}
                        className='start-date-container'
                        label="Start Date"
                        minDate={dayjs(range?.startDate)}
                        maxDate={dayjs(range?.endDate)}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DatePicker
                        style={{width:"320px",margin:"10px"}}
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