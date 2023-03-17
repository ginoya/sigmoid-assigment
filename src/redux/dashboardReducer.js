
const initState = {
    tableData: {
        data: [],
        loading: false,
        error: false
    },
    pieChartData: {
        data: [],
        loading: false,
        error: false
    },
    barChartData: {
        data: [],
        loading: false,
        error: false
    },
    showDashboardContents:false
}
export const FETCH_DASHBOARD_DATA = "FETCH_DASHBOARD_DATA";

export const FETCH_DASHBOARD_TABLE_SUCCESS = "FETCH_DASHBOARD_TABLE_SUCCESS";
export const FETCH_DASHBOARD_TABLE_FAILED = "FETCH_DASHBOARD_TABLE_FAILED"

export const FETCH_DASHBOARD_BARCHART_SUCCESS = "FETCH_DASHBOARD_BARCHART_SUCCESS";
export const FETCH_DASHBOARD_BARCHART_FAILED = "FETCH_DASHBOARD_BARCHART_FAILED";

export const FETCH_DASHBOARD_PIECHART_SUCCESS = "FETCH_DASHBOARD_PIECHART_SUCCESS";
export const FETCH_DASHBOARD_PIECHART_FAILED = "FETCH_DASHBOARD_PIECHART_FAILED";

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_DATA:
            return {
                ...state,
                showDashboardContents:true,
                tableData: {
                    ...state.tableData,
                    loading: true
                },
                pieChartData: {
                    ...state.pieChartData,
                    loading: true
                },
                barChartData: {
                    ...state.barChartData,
                    loading: true
                }
            }
        case FETCH_DASHBOARD_TABLE_SUCCESS:
            return {
                ...state,
                tableData: {
                    data: action.payload,
                    loading: false,
                    error: false
                }
            }
        case FETCH_DASHBOARD_TABLE_FAILED:
            return {
                ...state,
                tableData: {
                    data: [],
                    loading: false,
                    error: true
                }
            }
        case FETCH_DASHBOARD_BARCHART_SUCCESS:
            return {
                ...state,
                barChartData: {
                    data: action.payload,
                    loading: false,
                    error: false
                }
            }
        case FETCH_DASHBOARD_BARCHART_FAILED:
            return {
                ...state,
                barChartData: {
                    data: [],
                    loading: false,
                    error: true
                }
            }
            case FETCH_DASHBOARD_PIECHART_SUCCESS:
                return {
                    ...state,
                    pieChartData: {
                        data: action.payload,
                        loading: false,
                        error: false
                    }
                }
            case FETCH_DASHBOARD_PIECHART_FAILED:
                return {
                    ...state,
                    pieChartData: {
                        data: [],
                        loading: false,
                        error: true
                    }
                }
        default:
            return state;
    }
}

export default dashboardReducer;