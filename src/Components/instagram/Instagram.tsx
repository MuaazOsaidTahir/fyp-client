import React, { Dispatch, FC, useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import "./Instagram.css"
import { useDispatch, useSelector } from 'react-redux';
// import { ActionType, userFacebookStates } from '../../reducer/facebookreducer';
import { FacebookActionType } from '../../reducer/facebookReducer';
import { RootState } from '../../reducer';
import FacebookText from './FacebookText';
// import { EachPostField } from '../../interfaces/facebookInterfaces';

interface Props {
    selectedNode?: any,
    setPostAddedNode?: React.Dispatch<any>
}

const Facebook: FC<Props> = ({ selectedNode, setPostAddedNode }) => {
    const InstagramProfile = useSelector((store: RootState) => store.instagramUser);
    const [userProfile, setuserProfile] = useState<any>(InstagramProfile || null);
    const [usersPages, setusersPages] = useState([])
    const [instagram, setinstagram] = useState<any>()
    const [instagramProfile, setinstagramProfile] = useState<any>()
    const dispatch: Dispatch<FacebookActionType> = useDispatch();

    console.log(InstagramProfile)

    const responseFacebook = (response: any) => {
        try {
            setuserProfile(response);
            // longLivedToken(response.accessToken)
            console.log(response);
            dispatch({ type: 'Facebook_AccessToken', payload: { accessToken: response.accessToken, userId: response.id } })
        } catch (error) {
            console.log(error)
        }
    }

    const componentClicked = () => {
        console.log("Clicked");
    }

    const getUserPage = async () => {
        const pages = await fetch(`https://graph.facebook.com/v13.0/me/accounts?access_token=${userProfile.accessToken}`)
        const userPage = await pages.json();
        setusersPages(userPage.data);
    }

    useEffect(() => {
        if (userProfile) {
            getUserPage()
        }
    }, [userProfile])

    const getInstagramPage = async () => {
        const insta = await fetch(`https://graph.facebook.com/v13.0/${usersPages[0].id}?fields=instagram_business_account&access_token=${userProfile.accessToken}`);
        const instaPro = await insta.json();
        setinstagram(instaPro);
        dispatch({ type: 'Instagram_AccessToken', payload: { accessToken: userProfile.accessToken, userId: instaPro.instagram_business_account.id } })
    }

    useEffect(() => {
        if (usersPages) {
            if (usersPages.length) {
                getInstagramPage()
            }
        }
    }, [usersPages])

    const getInstagramProfile = async () => {
        const res = await fetch(`https://graph.facebook.com/v13.0/${instagram.instagram_business_account.id}?fields=biography%2Cmedia_count%2Cprofile_picture_url%2Cmedia%2Cwebsite%2Cname&access_token=${userProfile.accessToken}`)
        const response = await res.json();
        console.log(response)
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
                !userProfile ?
                    <div className='facebook_login_btn' >
                        <FacebookLogin
                            // appId="214533880773194"
                            appId='944116122969052'
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={componentClicked}
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
                        <FacebookText selectedNode={selectedNode} saveCaption={saveCaption} />
                        {/* {
                            usersPages.length > 0 && <div>
                                {
                                    usersPages?.map(page => {
                                        console.log(page.id);
                                        return <Suspense key={page.id} fallback={<h4>Loading...</h4>} >
                                            <FacebookPages id={page.id} name={page.name} category={page.category} />
                                        </Suspense>
                                    })
                                }
                            </div>
                        } */}
                    </div>
            }
        </>
    );
}

export default Facebook;
