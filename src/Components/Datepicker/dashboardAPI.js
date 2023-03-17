import { postAxios } from "../axiosHelper/postAxios"

const dateRangeURL = 'https://sigviewauth.sigmoid.io/api/v1/getDateRange';
const dashboardDataURL = 'https://sigviewauth.sigmoid.io/api/v1/getData';

export const getDateRange = async (payload) =>{
    try{
        const rangeRes = await postAxios(dateRangeURL,payload);
        if(rangeRes.data.status.statusCode === "200"){
            return rangeRes.data.result
        }
        else return null
    }
    catch{
        return null
    }
}

export const getDashboardData = async(payload) =>{
    try{
        const dashboardData = await postAxios(dashboardDataURL,payload);
        if(dashboardData.data.status.statusCode === "200"){
            return dashboardData.data.result.data
        }
        else return null
    }
    catch{
        return null
    }
}