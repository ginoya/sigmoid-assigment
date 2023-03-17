import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_TABLE_SUCCESS, FETCH_DASHBOARD_TABLE_FAILED,
    FETCH_DASHBOARD_BARCHART_SUCCESS, FETCH_DASHBOARD_BARCHART_FAILED,
    FETCH_DASHBOARD_PIECHART_SUCCESS, FETCH_DASHBOARD_PIECHART_FAILED
} from '../redux/dashboardReducer';
import { getDashboardData } from '../Components/Datepicker/dashboardAPI';
import { getDashboardPayload, getPieChartPayload } from '../Components/Datepicker/datepickerHelper';
function* fetchDashboardTableData(action) {
    const chartData = {
        id: '1516252439345',
        type: 'table',
        xAxis: 'D044'
    }
    const payload = getDashboardPayload(action.payload.startDate, action.payload.endDate, chartData)
    try {
        const rangeData = yield call(getDashboardData, payload);
        if (rangeData) {
            yield put({ type: FETCH_DASHBOARD_TABLE_SUCCESS, payload: rangeData.map((row, index) => { return { ...row, id: index } }) })
        }
        else {
            yield put({ type: FETCH_DASHBOARD_TABLE_FAILED })
        }
    } catch (e) {
        yield put({ type: FETCH_DASHBOARD_TABLE_FAILED })
    }
}
function* fetchDashboardBarData(action) {
    const chartData = {
        id: '1516252235693',
        type: 'bar',
        xAxis: 'D017'
    }
    const payload = getDashboardPayload(action.payload.startDate, action.payload.endDate, chartData)
    try {
        const barData = yield call(getDashboardData, payload);
        if (barData) {
            yield put({ type: FETCH_DASHBOARD_BARCHART_SUCCESS, payload: barData })
        }
        else {
            yield put({ type: FETCH_DASHBOARD_BARCHART_FAILED })
        }
    } catch (e) {
        yield put({ type: FETCH_DASHBOARD_BARCHART_FAILED })
    }
}

function* fetchDashboardPieChartData(action) {
    const payload = getPieChartPayload(action.payload.startDate, action.payload.endDate)
    try {
        const pieData = yield call(getDashboardData, payload);
        if (pieData) {
            yield put({ type: FETCH_DASHBOARD_PIECHART_SUCCESS, payload: pieData })
        }
        else {
            yield put({ type: FETCH_DASHBOARD_PIECHART_FAILED })
        }
    } catch (e) {
        yield put({ type: FETCH_DASHBOARD_PIECHART_FAILED })
    }
}

function* dashboardSaga() {
    yield takeLatest(FETCH_DASHBOARD_DATA, fetchDashboardTableData)
    yield takeLatest(FETCH_DASHBOARD_DATA, fetchDashboardBarData)
    yield takeLatest(FETCH_DASHBOARD_DATA, fetchDashboardPieChartData)
}

export default dashboardSaga;