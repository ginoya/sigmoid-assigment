
import mySaga from "./rangeSaga";
import { all } from 'redux-saga/effects';
import dashboardSaga from './dashboardSaga';

export default function* rootSaga() {
  yield all([mySaga(), dashboardSaga()])
}