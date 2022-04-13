import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Avatar, IconButton } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import { Doughnut } from "react-chartjs-2";
import Loader from 'react-loader-spinner';
import { notificationToastify } from '../tostify/toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    instagramId: any,
    linkedInId: any,
    twitterId: any,
    type: any,
}

const UserCampaignsCards: FC<Props> = ({ type, instagramId, linkedInId, twitterId }) => {
    const InstagramProfile = useSelector((store: RootState) => store.instagramUser);
    const [postData, setpostData] = useState(null);

    useEffect(() => {
        if (instagramId && InstagramProfile) {
            getInstagramInsights()
        }
    }, [instagramId, type])

    const getInstagramInsights = async () => {
        try {
            const response = await axios(`https://graph.facebook.com/v13.0/${instagramId}/insights?metric=${type}&access_token=${InstagramProfile.accessToken}`)
            setpostData(() => {
                return {
                    labels: ['Instagram', 'LinkedIn', 'Twitter'],
                    datasets: [
                        {
                            label: type,
                            data: [response.data.data[0].values[0].value, 0, 0],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
            }
            )
        } catch (error) {
            notificationToastify('An Error Occured', 'error')
        }
    }


    return (
        <>
            {postData ? <Card className='usercapmaigns__cards' sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            +
                        </IconButton>
                    }
                    title="Name"
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Doughnut data={postData} />
                </CardContent>
            </Card> : <Loader type="Circles" color="#FF4A00" height={80} width={80} />}
        </>
    )
}

export default UserCampaignsCards