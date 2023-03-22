import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {FETCH_RANGE_AUTHORIZED} from '../../redux/rangeReducer';
import './Signin.css';

const authUrl = 'https://sigviewauth.sigmoid.io/signIn';
const loginFailMessage = 'Login failed. Please enter valid credentials.'
const initLoginObj = {
    username:"",
    password:"",
    error:"",
    loading:false
}
const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginDeatils, setLoginDeatils] = useState(initLoginObj);
    const isUnauthotorize = useSelector(state => state.range.isUnauthotorize);

    useEffect(()=>{
        const authToken = Cookies.get('authToken');
        if (authToken && !isUnauthotorize) {
            navigate('/dashboard')
        }
    },[])

     const handleSubmit = async () =>{
        setLoginDeatils({...loginDeatils,loading:true})
        try{
            const authData = await Axios.post(authUrl,{
                "email": loginDeatils.username,
                "password": loginDeatils.password,
                "rememberMe": true
              })
            setLoginDeatils({...loginDeatils,loading:false})
            if(authData.data.statusCode === "200"){
                Cookies.set('authToken', authData.data.token, { expires: 7 });
                setLoginDeatils(initLoginObj)
                dispatch({
                    type: FETCH_RANGE_AUTHORIZED,
                })
                navigate('/dashboard')
            }else{
                setLoginDeatils({...loginDeatils,error:loginFailMessage})
            }
        }
        catch{
            setLoginDeatils({...loginDeatils,error:loginFailMessage})
        }
    }
    return (
        <div className='signin-container'>
            {loginDeatils.loading &&<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> }
            <TextField
                id="username"
                label="Email"
                value={loginDeatils.username}
                onChange={(e)=>setLoginDeatils({...loginDeatils,username:e.target.value})}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={loginDeatils.password}
                onChange={(e)=>setLoginDeatils({...loginDeatils,password:e.target.value})}
            />
            <div className='error'>{loginDeatils.error}</div>
            <Button type="submit" style={{width:"100px"}} variant="contained" onClick={()=>handleSubmit()}>Login</Button>
        </div>
    )
}

export default Signin;