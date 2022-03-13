import React, { FC, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import { linkedInToken } from './apis/linkedInApi';
import "./LogInLinkedIn.css"

let clientId = '7786u3tstimzmb';
let redirectURL = 'http://localhost:3000/dashboard/LinkedIn'

const LogInLinkedIn: FC = () => {
    const [searchParams, setsearchParams] = useSearchParams()
    const [LinkedIncode, setLinkedIncode] = useState<string>('')
    const [_, setCookie] = useCookies(['linkedinToken']);

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            setLinkedIncode(code);
            setsearchParams('')
        }
    }, [searchParams])

    const tokenFunction = async () => {
        const AccessTokenResponse = await linkedInToken(LinkedIncode);
        if (AccessTokenResponse.access_token) {
            setCookie('linkedinToken', AccessTokenResponse.access_token, {
                expires: new Date(Date.now() + AccessTokenResponse.expires_in)
            })
        }
    }

    useEffect(() => {
        if (LinkedIncode) {
            tokenFunction()
            setLinkedIncode('')
        }
    }, [LinkedIncode])

    const linkedInSignIn = () => {
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectURL}&state=6021060&scope=r_liteprofile%20r_emailaddress%20w_member_social`
    }

    return (
        <div className='linkedin_login' >
            <button onClick={linkedInSignIn} className='linkedin_login_btn' ><img src='https://res.cloudinary.com/muaaz/image/upload/v1645142460/images_giuwtb.png' alt='Login with LinkedIn' /></button>
        </div>
    )
}

export default LogInLinkedIn