import React, { FC, useEffect, useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import AvatarComponent from './AvatarComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';
import Badge from '@mui/material/Badge';

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
                    <img className={scrolledvalue ? "header_scrolled_img" : 'header_img'} src="https://res.cloudinary.com/djdcv17qb/image/upload/v1640114184/smm_wptpwe.png" alt="SMM" />
                </Link>
                {(userState && userState?.subscription_status === 'canceled') && <Link to='/membership' >
                    Get Membership
                </Link>}
            </div>
            <div>
                {
                    userState ?
                        <Badge badgeContent={userState?.subscription_status === 'canceled' ? 'FREE' : 'PRO'} color={userState?.subscription_status === 'canceled' ? 'primary' : 'secondary'} >
                            <AvatarComponent />
                        </Badge> :
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
        </div >
    )
}

export default Header
