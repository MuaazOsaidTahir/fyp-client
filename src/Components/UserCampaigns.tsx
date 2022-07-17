import { useMutation } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsercreatedCampaigns } from '../apis/api'
import { RootState } from '../reducer'
import Header from './Header'
import "./UserCampaigns.css"
import UserCampaignsCards from './UserCampaignsCards'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loader from 'react-loader-spinner'
import { notificationToastify, Options } from '../tostify/toastify'

interface campaigns {
    userId: any,
    instagramPostId: any,
    facebookPostId: any,
    twitterPostId: any,
    // created_at: any,
    date: any,
    campaignName: any
}

const UserCampaigns: FC = () => {
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    const [mutate, { data, loading, error }] = useMutation(getUsercreatedCampaigns)
    const [campaigns, setcampaigns] = useState<Array<campaigns>>([])
    const [Type, setType] = useState<string>('engagement');

    useEffect(() => {
        if (loading) {
            notificationToastify('Loading...', Options.WARNING)
        }
    }, [loading])

    useEffect(() => {
        if (error) {
            notificationToastify('Error Occured!', Options.ERROR)
        }
    }, [error])

    useEffect(() => {
        if (userState) {
            mutate({
                variables: {
                    userId: userState.id
                }
            })
        }
    }, [userState])

    useEffect(() => {
        if (data) {
            // console.log(data);
            setcampaigns(data.getUserCampaigns)
        }
    }, [data])

    const handleChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string)
    }

    return (
        <>
            <Header />
            {
                loading ? <div className='loader_error_page' >
                    <Loader type="TailSpin" color="#0094FF" height={80} width={80} />
                </div>
                    : error ? <div className='loader_error_page' >
                        <img src='https://res.cloudinary.com/djdcv17qb/image/upload/v1650313838/undraw_warning_cyit_jdwopz.svg' alt='Error' />
                    </div> :
                        <div className='user_campaign' >
                            <>
                                {
                                    campaigns.length > 0 ?
                                        <>
                                            <div className='campaign_header' >
                                                <h2>User Created Campaigns</h2>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl>
                                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={Type}
                                                            label="Age"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value='engagement'>Engagement</MenuItem>
                                                            <MenuItem value='impressions'>Impressions</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                            <div className='campaigns_cards' >
                                                {
                                                    campaigns.map((campaign, i) => {
                                                        return <UserCampaignsCards key={i} type={Type} campaignName={campaign.campaignName} instagramId={campaign.instagramPostId} facebookId={campaign.facebookPostId} twitterId={campaign.twitterPostId} created={campaign.date} />
                                                    })
                                                }
                                            </div>
                                        </>
                                        :
                                        <h2>No Campaigns Created So Far!</h2>
                                }
                            </>
                        </div>
            }
        </>
    )
}

export default UserCampaigns