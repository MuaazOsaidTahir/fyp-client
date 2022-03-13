import axios from "axios"
import { DataLinkedIn } from "../../../reducer/linkedInreducer"

export interface linkedInTokenRes {
    access_token: string,
    expires_in: number
}

export interface linkedInProfile {
    name: string,
    profilePicture: string,
    userId: string,
}

export const linkedInToken = async (code: string): Promise<linkedInTokenRes> => {
    const res = await axios({
        method: 'post',
        url: "http://localhost:8000/linkedInToken",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            accessCode: code
        })
    })

    return res.data;
}

export const getLinkedInprofile = async (token: string): Promise<linkedInProfile> => {
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/linkedInProfile',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            token: token
        })
    })

    return res.data
}

export const addingShare = async (LinkedInState: DataLinkedIn, description: string) => {
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/sharingPostLinkedIn',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ ...LinkedInState, description: description })
    })

    console.log(res);
    // return res.data
}