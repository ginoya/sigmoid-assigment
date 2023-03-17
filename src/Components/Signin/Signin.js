import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Axios from 'axios';
import './Signin.css';

const authUrl = 'https://sigviewauth.sigmoid.io/signIn';
const loginFailMessage = 'Login failed. Please enter valid credentials.'
const initLoginObj = {
    username:"",
    password:"",
    error:""
}
const Signin = () => {
    const navigate = useNavigate();
    const [loginDeatils, setLoginDeatils] = useState(initLoginObj);
    useEffect(()=>{
        const authToken = Cookies.get('authToken');
        if (authToken) {
            navigate('/dashboard')
        }
    },[])

     const handleSubmit = async () =>{
        try{
            const authData = await Axios.post(authUrl,{
                "email": loginDeatils.username,
                "password": loginDeatils.password,
                "rememberMe": true
              })
    
            if(authData.data.statusCode === "200"){
                Cookies.set('authToken', authData.data.token, { expires: 7 });
                setLoginDeatils(initLoginObj)
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
            <TextField
                required
                id="username"
                label="Username"
                value={loginDeatils.username}
                onChange={(e)=>setLoginDeatils({...loginDeatils,username:e.target.value})}
            />
            <TextField
                required
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