import React, { FC, useEffect, useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import AvatarComponent from './AvatarComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';

interface Props {
    signup?: boolean,
    login?: boolean
}

const Header: FC<Props> = ({ signup, login }): JSX.Element => {
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    // console.log(userState)
    const [scrolledvalue, setscrolledvalue] = useState<number>(0)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setscrolledvalue(window.scrollY);
        })
    }, [])

    return (
        <div className={`${scrolledvalue ? "header_scrolled header" : "header"}`} >
            <div className='navigation_header' >
                <Link to="/" >
                    <img src="https://res.cloudinary.com/djdcv17qb/image/upload/v1640114184/smm_wptpwe.png" alt="SMM" />
                </Link>
                <Link to='/membership' >
                    Get Membership
                </Link>
                {userState && <div className={`notification_style ${userState.subscription_status === 'canceled' ? 'cancel' : 'active'}`} >
                    <span>.</span>
                    {
                        userState.subscription_status === 'canceled' ? 'Free' : 'Pro'
                    }
                    <span>.</span>

                </div>}
            </div>
            <div>
                {
                    userState ?
                        <AvatarComponent /> :
                        <>
                            {
                                login && <Link to="/login" >
                                    <button className='login_btn' >LogIn</button>
                                </Link>
                            }
                            {
                                signup &&
                                <Link to="/signUp" >
                                    <button className='signup_btn' >SignUp</button>
                                </Link>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Header
