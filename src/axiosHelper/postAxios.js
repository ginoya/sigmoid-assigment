import axios from 'axios';
import Cookies from 'js-cookie';

export const postAxios = (url,payload) =>{
    return axios.post(url,payload,{
        headers:{
           'x-auth-token':Cookies.get('authToken')
        }
    })
}