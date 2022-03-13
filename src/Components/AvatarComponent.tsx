import React, { FC, useState } from 'react'
import { Avatar, Button } from '@mui/material'
import "./AvatarComponent.css"
import { Link } from 'react-router-dom'

const AvatarComponent: FC = () => {
    const [toggle, settoggle] = useState<boolean>(false);

    return (
        <div className="avatar_container" >
            <Avatar className='avatar' alt="Muaaz" onClick={() => settoggle(!toggle)} />
            <div className={`${toggle ? "profile__expand" : "profile__expand profile__expand__none"}`} >
                <Link to={"/dashboard"} >
                    <Button color="primary" variant="contained" > Dashboard</Button>
                </Link>
                <div className='divider' />
                <Button variant="contained" color="error" > LogOut </Button>
            </div>
        </div>
    )
}

export default AvatarComponent
