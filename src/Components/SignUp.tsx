import React, { Dispatch, FC, useEffect, useState } from 'react'
import Header from './Header'
import "./SignUp.css"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useMutation } from '@apollo/client';
import { ActionType, userLoggedInStates } from '../reducer/logInState';
import { useDispatch } from 'react-redux';
import { signupUser } from '../apis/api';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

interface signupForm {
    email: string,
    password: string,
}

const SignUp: FC = () => {
    const [mutate, { data, loading }] = useMutation(signupUser)
    // console.log(data);
    const dispatch: Dispatch<ActionType> = useDispatch();
    const [signUpdata, setsignUpdata] = useState<signupForm>({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            if (data.signupUser) {
                dispatch({ type: userLoggedInStates.user, payload: data.signupUser })
                navigate("/")
            }
            else if (data.signupUser === null) {
                alert("User not Registered!")
            }
        }
    }, [data])

    const signUpUserdata = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setsignUpdata((val: signupForm): signupForm => {
            return {
                ...val,
                [name]: value
            }
        })
    }

    const signupUserbtn = () => {
        mutate({
            variables: {
                email: signUpdata.email,
                password: signUpdata.password
            }
        })
    }

    return (
        <>
            <Header signup={false} login={true} />
            <div className='SignUp' >
                <div className='signup_form' >
                    <div className='signup_form_left' >
                        <div>
                            <h1>Join Now to manage all your accounts at one place.</h1>
                            <ul>
                                <li> <CheckCircleIcon /><span> Easy setup, no coding required</span> </li>
                                <li><CheckCircleIcon /><span> 7 days free trial on request </span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className='signup_form_right' >
                        <input name="email" onChange={signUpUserdata} type="email" placeholder='Email...' />
                        <input name="password" onChange={signUpUserdata} type="password" placeholder='Password...' />
                        {loading ? <Loader type="TailSpin" color="#333333" height={20} width={20} /> : <button onClick={signupUserbtn} className='signup_form_btn' > SignUp </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
