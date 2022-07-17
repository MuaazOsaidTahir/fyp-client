import React, { Dispatch, FC, useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import "./Instagram.css"
import { useDispatch, useSelector } from 'react-redux';
import { FacebookActionType } from '../../reducer/facebookReducer';
import { RootState } from '../../reducer';
import useAccessToken from './customComponent/useAccessToken';
import InstagramText from './InstagramText';

interface Props {
    selectedNode?: any,
    setPostAddedNode?: React.Dispatch<any>
}

const Instagram: FC<Props> = ({ selectedNode, setPostAddedNode }) => {
    const FacebookToken = useSelector((store: RootState) => store.facebookUser);
    const [instagram, setinstagram] = useState<any>()
    const [instagramProfile, setinstagramProfile] = useState<any>()
    const dispatch: Dispatch<FacebookActionType> = useDispatch();
    const { responseFacebook, usersPages } = useAccessToken()
    
    const getInstagramPage = async () => {
        const insta = await fetch(`https://graph.facebook.com/v13.0/${usersPages[0].id}?fields=instagram_business_account&access_token=${FacebookToken.accessToken}`);
        const instaPro = await insta.json();
        setinstagram(instaPro);
        dispatch({ type: 'Instagram_AccessToken', payload: { accessToken: FacebookToken.accessToken, userId: instaPro.instagram_business_account.id } })
    }

    useEffect(() => {
        if (usersPages) {
            if (usersPages.length) {
                getInstagramPage()
            }
        }
    }, [usersPages])

    const getInstagramProfile = async () => {
        const res = await fetch(`https://graph.facebook.com/v13.0/${instagram.instagram_business_account.id}?fields=biography%2Cmedia_count%2Cprofile_picture_url%2Cmedia%2Cwebsite%2Cname&access_token=${FacebookToken.accessToken}`)
        const response = await res.json();
        setinstagramProfile(response);
    }

    useEffect(() => {
        if (instagram) {
            getInstagramProfile()
        }
    }, [instagram])


    // selectedNode logics
    const saveCaption = (nodeCaption: string) => {
        selectedNode.data.caption = nodeCaption
        setPostAddedNode(selectedNode)
    }

    return (
        <>
            {
                !FacebookToken ?
                    <div className='facebook_login_btn' >
                        <FacebookLogin
                            // appId="214533880773194"
                            appId='944116122969052'
                            autoLoad={true}
                            fields="name,email,picture"
                            // onClick={componentClicked}
                            callback={responseFacebook} />
                    </div> :
                    <div className='facebook_profiles_page' >
                        {instagramProfile ? <div className='facebook_profile_header' >
                            <div>
                                <h3>{instagramProfile.name}</h3>
                                <img src={instagramProfile.profile_picture_url} alt={instagramProfile.name} />
                            </div>
                            <p className='bio_text' >{instagramProfile.biography}</p>
                        </div> : <h3>Loading...</h3>}
                        <InstagramText selectedNode={selectedNode} saveCaption={saveCaption} />
                    </div>
            }
        </>
    );
}

export default Instagram;
