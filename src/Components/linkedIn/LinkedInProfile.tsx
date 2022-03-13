import React, { Dispatch, FC, useEffect, useState } from 'react'
import { getLinkedInprofile, linkedInProfile } from './apis/linkedInApi'
import "./LinkedInProfile.css"
import { useDispatch } from 'react-redux';
import { ActionType, LinkedInStates } from '../../reducer/linkedInreducer';

interface Props {
    linkedInAccessToken: string
}

const LinkedInProfile: FC<Props> = ({ linkedInAccessToken }) => {
    const [userProfile, setuserProfile] = useState<linkedInProfile>()
    const dispatch: Dispatch<ActionType> = useDispatch();


    const gettingProfile = async () => {
        const res = await getLinkedInprofile(linkedInAccessToken);

        setuserProfile(res);
        dispatch({ type: LinkedInStates.user, payload: { accessToken: linkedInAccessToken, userId: res.userId } })
    }


    useEffect(() => {
        if (linkedInAccessToken) {
            gettingProfile()
        }
    }, [linkedInAccessToken])


    return (
        <div className='LinkedIn_profile' >
            {userProfile ? <div className='LinkedIn_profile_header' >
                <h3>{userProfile.name}</h3>
                <img src={userProfile.profilePicture} alt={userProfile.name} />
            </div> : 'Loading...'}
        </div>
    )
}

export default LinkedInProfile