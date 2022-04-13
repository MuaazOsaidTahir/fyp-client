import React, { Dispatch, FC, useEffect, useState } from 'react'
import Header from './Header'
import "./LogIn.css"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useMutation } from "@apollo/client"
import { userLogin } from "../apis/api"
import { useDispatch } from 'react-redux';
import { ActionType, userLoggedInStates } from '../reducer/logInState';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { notificationToastify } from '../tostify/toastify';

interface logInState {
    email: string,
    password: string
}

const LogIn: FC = () => {
    const [mutate, { data, loading }] = useMutation(userLogin)
    const [userLoginDetails, setuserLoginDetails] = useState<logInState>({
        email: "",
        password: "",
    })
    const dispatch: Dispatch<ActionType> = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            if (data.loginUser) {
                dispatch({ type: userLoggedInStates.user, payload: data.loginUser })
                navigate("/")
                notificationToastify(`Logged in as: ${data.loginUser.email}`, 'success')
            }
            else if (data.loginUser === null) {
                notificationToastify(`User not Registered`, 'error')
            }
        }
    }, [data])

    useEffect(() => {
        let url: string = window.location.href;
        let str: Array<string> = url.split('query=');

        if (str[1] === 'login') {
            alert('LogIn is required first to purchase a membership.')
        }
    }, [])

    const loginform = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setuserLoginDetails((val: logInState) => {
            return {
                ...val,
                [name]: value
            }
        })
    }

    const loginUser = () => {
        mutate({
            variables: {
                email: userLoginDetails.email,
                password: userLoginDetails.password
            }
        })
    }

    return (
        <>
            <Header signup={true} login={false} />
            <div className='logIn' >
                <div className='login_inner card_style' >
                    <div className='login_inner_left' >
                        <div>
                            <h1>Continue managing your accounts.</h1>
                            <ul>
                                <li><CheckCircleIcon /><span> Easily integrate your social media accounts and manage all at one place.</span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className='login_inner_right' >
                        <h3>Welcome Back!</h3>
                        <input onChange={loginform} value={userLoginDetails.email} type="email" placeholder='Email...' name="email" />
                        <input onChange={loginform} value={userLoginDetails.password} type="password" placeholder='Password...' name="password" />
                        {loading ? <Loader type="TailSpin" color="#333333" height={20} width={20} /> : <button onClick={loginUser} className='login_form_btn' > LogIn </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn
