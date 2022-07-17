import React, { Dispatch, FC, useState } from 'react'
import { Avatar, Button } from '@mui/material'
import "./AvatarComponent.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ActionType, userLoggedInStates } from '../reducer/logInState'

const AvatarComponent: FC = () => {
    const [toggle, settoggle] = useState<boolean>(false);
    const dispatch: Dispatch<ActionType> = useDispatch();

    const logOutUser = async () => {
        const res = await axios("http://localhost:8000/logOut", {
            method: 'GET',
        })
        console.log(res.data);

        dispatch({ type: userLoggedInStates.remove, payload: null })
    }

    return (
        <div className="avatar_container" >
            <Avatar className='avatar' alt="Muaaz" onClick={() => settoggle(!toggle)} />
            <div className={`${toggle ? "profile__expand" : "profile__expand profile__expand__none"}`} >
                <Link to="/createcampaign" >
                    <Button color="primary" variant="contained" > Dashboard</Button>
                </Link>
                <Link to="/usercampaigns" >
                    <Button color="secondary" variant="outlined" > Campaigns</Button>
                </Link>
                <div className='divider' />
                <Button variant="contained" color="error" onClick={logOutUser} > LogOut </Button>
            </div>
        </div>
    )
}

export default AvatarComponent
