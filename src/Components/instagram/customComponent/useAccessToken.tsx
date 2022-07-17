import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducer';
import { FacebookActionType } from '../../../reducer/facebookReducer';

const useAccessToken = () => {
    const dispatch: Dispatch<FacebookActionType> = useDispatch();
    const [usersPages, setusersPages] = useState([])
    const FacebookToken = useSelector((store: RootState) => store.facebookUser);

    const responseFacebook = (response: any) => {
        try {
            console.log(response);
            dispatch({ type: 'Facebook_AccessToken', payload: { accessToken: response.accessToken, userId: response.id } })
        } catch (error) {
            console.log(error)
        }
    }

    const getUserPage = async () => {
        const pages = await fetch(`https://graph.facebook.com/v13.0/me/accounts?access_token=${FacebookToken.accessToken}`)
        const userPage = await pages.json();
        setusersPages(userPage.data);
    }

    useEffect(() => {
        if (FacebookToken) {
            getUserPage()
        }
    }, [FacebookToken])

    return { responseFacebook, usersPages }
}

export default useAccessToken