
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import rangeReducer from './rangeReducer';
import dashboardReducer from './dashboardReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux-saga/rootSaga';
const sagaMiddleware = createSagaMiddleware()

const combinedReducers = combineReducers({
    dashboard:dashboardReducer,
    range:rangeReducer
})

const store = configureStore({
    reducer:combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

export default store;