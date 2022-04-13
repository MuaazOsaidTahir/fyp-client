import React, { FC, useEffect } from 'react'
import DashboardSidebar from "./DashboardSidebar"
import Header from "./Header"
import "./Dashboard.css"
import NoPlatform from './NoPlatform'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../reducer'
import { useSelector } from 'react-redux'
import LinkedIn from './linkedIn/LinkedIn'
import Instagram from './facebook/Instagram'

interface Props {
    toggle: boolean
}

const Dashboard: FC<Props> = ({ toggle }) => {
    const { platformName } = useParams();
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userState) {
            navigate("/logIn")
        }
    }, []);

    return (
        <>
            <Header />
            <div className='dashboard' >
                <DashboardSidebar />
                {
                    !toggle ?
                        <NoPlatform /> :
                        platformName === "LinkedIn" ? <LinkedIn /> : platformName === "Instagram" ? <Instagram /> : <h3>{platformName}</h3>
                }
            </div>
        </>
    )
}

export default Dashboard
