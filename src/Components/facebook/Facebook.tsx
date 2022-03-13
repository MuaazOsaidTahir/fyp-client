import React, { Dispatch, FC, useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import "./Facebook.css"
import FacebookPosts from './FacebookPosts';
import Loader from "react-loader-spinner";
import { useDispatch } from 'react-redux';
// import { ActionType, userFacebookStates } from '../../reducer/facebookreducer';
import { Button } from '@mui/material';
import { EachPostField } from '../../interfaces/facebookInterfaces';

const Facebook: FC = () => {
    const [userProfile, setuserProfile] = useState<any>(null);
    const [userPosts, setuserPosts] = useState<any>([]);
    const [userPostsUrl, setuserPostsUrl] = useState<Array<EachPostField>>([]);
    const [nextPaging, setnextPaging] = useState<any>(null);
    // const dispatch: Dispatch<ActionType> = useDispatch();
    const [loaderState, setloaderState] = useState(false);

    const responseFacebook = (response: any) => {
        try {
            setuserProfile(response);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const componentClicked = () => {
        console.log("Clicked");
    }

    const getUserPosts = async () => {
        const res = await fetch(`https://graph.facebook.com/v12.0/${userProfile.userID}/photos/uploaded?access_token=${userProfile.accessToken}`);
        const data = await res.json();

        // console.log(data);
        setuserPosts(data.data);
        setnextPaging(data.paging.next)
    }

    const getPosts = async () => {
        const data = await Promise.all(userPosts.map(async (eachPost: any) => {
            const res = await fetch(`https://graph.facebook.com/v12.0/${eachPost.id}?fields=picture,name,name_tags,comments,likes,created_time,alt_text&access_token=${userProfile.accessToken}`);

            const responsedata: EachPostField = await res.json();

            // console.log(responsedata);

            return {
                picture: responsedata.picture, name: responsedata?.name, name_tags: responsedata?.name_tags || [],
                comments: responsedata?.comments?.data || [],
                likes: responsedata?.likes?.data || [],
                id: responsedata.id, created_time: responsedata.created_time,
                alt_text: responsedata.alt_text
            }
        }))
        console.log(userPostsUrl);
        setuserPostsUrl((val: any) => {
            return [...val, ...data];
        });
    }

    const loadMorePosts = async (url: any) => {
        setloaderState(true);
        const res = await fetch(url);
        const data = await res.json();
        setuserPosts(data.data);
        setloaderState(false)
        setnextPaging(data.paging.next || null)
    }

    useEffect(() => {
        if (userProfile) {
            getUserPosts()
            // dispatch({ type: userFacebookStates.user, payload: userProfile })
        }
    }, [userProfile]);

    useEffect(() => {
        if (userPosts.length) {
            getPosts();
        }
    }, [userPosts]);

    return (
        <>
            {
                !userProfile ?
                    <div className='facebook_login_btn' >
                        <FacebookLogin
                            appId="214533880773194"
                            autoLoad={true}
                            fields="name,email,picture,posts"
                            onClick={componentClicked}
                            callback={responseFacebook} />
                    </div> :
                    <div className='facebook_profiles_page' >
                        <div className='facebook_profile_header' >
                            <h3>{userProfile.name}</h3>
                            <img src={userProfile.picture.data.url} alt={userProfile.name} />
                        </div>
                        <div className='picture_container' >
                            {
                                userPostsUrl.length > 0 ? userPostsUrl.map((eachPost: EachPostField) => {
                                    return <FacebookPosts alt_text={eachPost.alt_text} created_time={eachPost.created_time} name={eachPost.name}
                                        name_tags={eachPost.name_tags} likes={eachPost.likes} comments={eachPost.comments} picture={eachPost.picture} key={eachPost.id} id={eachPost.id} />
                                }) : <Loader type="TailSpin" color="#3b5998" height={50} width={50} />
                            }
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            {
                                loaderState ? <Loader type="TailSpin" color="#3b5998" height={50} width={50} /> : nextPaging ?
                                    <Button style={{ color: "#1565C0" }} onClick={() => loadMorePosts(nextPaging)} >Load More</Button>
                                    : ""
                            }
                        </div>
                    </div>
            }
        </>
    );
}

export default Facebook;
