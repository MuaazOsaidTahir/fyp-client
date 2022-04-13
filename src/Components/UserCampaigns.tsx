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

interface campaigns {
    userId: any,
    instagramPostId: any,
    linkedinPostId: any,
    twitterPostId: any,
}

const UserCampaigns: FC = () => {
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    const [mutate, { data }] = useMutation(getUsercreatedCampaigns)
    const [campaigns, setcampaigns] = useState<Array<campaigns>>([])
    const [Type, setType] = useState<string>('engagement');

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
            setcampaigns(data.getUserCampaigns)
        }
    }, [data])

    const handleChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string)
    }

    return (
        <>
            <Header />
            <div className='user_campaign' >
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
                            return <UserCampaignsCards key={i} type={Type} instagramId={campaign.instagramPostId} linkedInId={campaign.linkedinPostId} twitterId={campaign.twitterPostId} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UserCampaigns