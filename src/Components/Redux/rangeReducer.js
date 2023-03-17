
const initState = {
    range:{
    },
    loading:true,
    error:false
}
export const FETCH_RANGE_DATA = "FETCH_RANGE_DATA";
export const FETCH_RANGE_SUCCESS = "FETCH_RANGE_SUCCESS";
export const FETCH_RANGE_FAILED = "FETCH_RANGE_FAILED"

const rangeReducer = (state=initState,action) =>{
    switch (action.type) {
        case FETCH_RANGE_DATA:
            return {
                ...state,
                loading :true,
                error:false
            }
        case FETCH_RANGE_SUCCESS:
            return {
                ...state,
                range:{
                    startDate:parseInt(action.payload.startDate),
                    endDate:parseInt(action.payload.endDate)
                },
                loading:false,
                error:false
            }
        case FETCH_RANGE_FAILED:
            return {
                ...state,
                range:{},
                loading:false,
                error:true
            }
        default:
            return state;
    }
}

export default rangeReducer;