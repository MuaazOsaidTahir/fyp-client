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
import { notificationToastify, Options } from '../tostify/toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import moment from "moment"

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    instagramId: any,
    facebookId: any,
    twitterId: any,
    type: any,
    campaignName: any,
    created: any,
}

const UserCampaignsCards: FC<Props> = ({ created, campaignName, type, instagramId, facebookId, twitterId }) => {
    const InstagramProfile = useSelector((store: RootState) => store.instagramUser);
    const [postData, setpostData] = useState(null);
    const [toggler, settoggler] = useState(false)

    useEffect(() => {
        if (instagramId && InstagramProfile) {
            getInstagramInsights()
            // settoggler(false);
        }
        else if(!InstagramProfile){
            // settoggler(false);
            notificationToastify("LogIn with Instagam First", Options.ERROR)
        }
    }, [instagramId, type])

    const getInstagramInsights = async () => {
        try {
            const response = await axios(`https://graph.facebook.com/v13.0/${instagramId}/insights?metric=${type}&access_token=${InstagramProfile.accessToken}`)
            // console.log(response)
            setpostData(() => {
                return {
                    labels: ['Instagram', 'Facebook', 'Twitter'],
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
            })
            settoggler(true);
        } catch (error) {
            notificationToastify('An Error Occured', Options.ERROR )
        }
    }

    return (
        <>
            {toggler ? <Card className='usercapmaigns__cards' sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {campaignName.split("")[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            +
                        </IconButton>
                    }
                    title={campaignName}
                    subheader={moment(created).fromNow()}
                />
                <CardContent>
                    <Doughnut data={postData} />
                </CardContent>
            </Card> : <Loader type="Circles" color="#FF4A00" height={80} width={80} />}
        </>
    )
}

export default UserCampaignsCards