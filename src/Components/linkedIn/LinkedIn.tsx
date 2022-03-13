import React, { FC, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import LogInLinkedIn from './LogInLinkedIn';
import LinkedInProfile from "./LinkedInProfile"

const LinkedIn: FC = () => {
    const [cookies] = useCookies(['linkedinToken']);
    const [LinkedInAccessToken, setLinkedInAccessToken] = useState<string>(cookies.linkedinToken)

    useEffect(() => {
        if (cookies.linkedinToken) {
            setLinkedInAccessToken(cookies.linkedinToken)
        }
    }, [cookies])

    return (
        <>
            {
                LinkedInAccessToken ? <LinkedInProfile linkedInAccessToken={LinkedInAccessToken} /> : <LogInLinkedIn />
            }
        </>
    )
}

export default LinkedIn