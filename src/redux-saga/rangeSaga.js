import { call, put, takeLatest } from 'redux-saga/effects';
import {FETCH_RANGE_DATA,FETCH_RANGE_FAILED,FETCH_RANGE_SUCCESS,FETCH_RANGE_UNAUTHORIZED} from '../redux/rangeReducer';
import { getDateRange } from '../Components/Datepicker/dashboardAPI';


function* fetchUser(action) {
  try {
    const rangeData = yield call(getDateRange, action.payload);
    if(rangeData && rangeData !== 401){
        yield put({ type: FETCH_RANGE_SUCCESS, payload: rangeData })
    }
    else if(rangeData === 401){
      yield put({ type: FETCH_RANGE_UNAUTHORIZED })
    }
    else{
      yield put({ type: FETCH_RANGE_FAILED})
    }
  } catch (e) {
    yield put({ type: FETCH_RANGE_FAILED})
  }
}

function* mySaga() {
  yield takeLatest(FETCH_RANGE_DATA, fetchUser)
}

export default mySaga