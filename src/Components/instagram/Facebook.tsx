import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import ReactFacebookLogin from 'react-facebook-login';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import useAccessToken from './customComponent/useAccessToken'
import InstagramText from './InstagramText';

interface Props {
    selectedNode?: any,
    setPostAddedNode?: React.Dispatch<any>
}

const Facebook: FC<Props> = ({ selectedNode, setPostAddedNode }) => {
    const FacebookToken = useSelector((store: RootState) => store.facebookUser);
    const [facebookProfile, setfacebookProfile] = useState<any>()
    const { responseFacebook, usersPages } = useAccessToken();

    const getUserProfile = async () => {
        const res = await axios(`https://graph.facebook.com/v13.0/me?fields=picture%2Cname&access_token=${FacebookToken.accessToken}`);
        setfacebookProfile(res.data);
    }

    useEffect(() => {
        if (FacebookToken) {
            getUserProfile()
        }
    }, [FacebookToken])


    useEffect(() => {
        if (usersPages) {
            if (usersPages.length) {
                console.log(usersPages)
            }
        }
    }, [usersPages])

    const saveCaption = (nodeCaption: string) => {
        selectedNode.data.caption = nodeCaption
        setPostAddedNode(selectedNode)
    }

    return (
        <>
            {
                !FacebookToken ?
                    <div className='facebook_login_btn' >
                        <ReactFacebookLogin
                            // appId="214533880773194"
                            appId='944116122969052'
                            autoLoad={true}
                            fields="name,email,picture"
                            // onClick={componentClicked}
                            callback={responseFacebook} />
                    </div> :
                    <div className='facebook_profiles_page' >
                        {facebookProfile ? <div className='facebook_profile_header' >
                            <div>
                                <h3>{facebookProfile.name}</h3>
                                <img src={facebookProfile.picture.data.url} alt={facebookProfile.name} />
                            </div>
                        </div> : <h3>Loading...</h3>}
                        <InstagramText selectedNode={selectedNode} saveCaption={saveCaption} />
                    </div>
            }
        </>
    )
}

export default Facebook