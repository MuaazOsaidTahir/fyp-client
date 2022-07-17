import React, { FC, useEffect, useState } from 'react'
import "./LeftSiderBarCampaign.css"
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { Avatar, CardHeader, TextField } from '@mui/material';

let platforms = [
    {
        name: "Facebook",
        color: 'blue',
        img: 'https://res.cloudinary.com/djdcv17qb/image/upload/v1650156864/download_yimhyd.png',
        type: "platform"
    },
    {
        name: "Instagram",
        color: 'pink',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sqXXCpXbtuZC28_YtFXtqG2-l4lqamZ00WI2O5xjA-uIWA-JY_mGH1d2cbO3GWio1GE&usqp=CAU',
        type: "platform"
    },
]

let inputs = [
    {
        name: 'Picture Selector',
        img: 'https://res.cloudinary.com/muaaz/image/upload/v1646013261/download_ecqagq.jpg',
        type: "input"
    }
]

let timer = [
    {
        name: 'Timer',
        img: 'https://res.cloudinary.com/djdcv17qb/image/upload/v1650661758/download_gjomvt.png',
        type: "timer"
    }
]

interface Props {
    ClickedComponent: (para: any) => void
}

const LeftSiderBarCampaign: FC<Props> = ({ ClickedComponent }) => {
    const [campaignName, setcampaignName] = useState('')

    useEffect(() => {
        let name = localStorage.getItem('Campaign_name');
        if (name) {
            setcampaignName(name);
        }
    }, [])

    useEffect(() => {
        if (campaignName) {
            localStorage.setItem('Campaign_name', campaignName)
        }
    }, [campaignName])

    return (
        <div className='LeftSiderBarCampaign' >
            <TextField value={campaignName} onChange={(e) => setcampaignName(e.target.value)} style={{ marginBottom: "1.5rem" }} id="outlined-basic" label="Campaign Name" color={campaignName ? "success" : "warning"} variant="filled" focused />
            <div className='containers' >
                <h2>Platforms</h2>
                {
                    platforms.map((platform, i) => {
                        return <IconButton key={i} onClick={() => ClickedComponent(platform)} >
                            <Card variant="outlined" >
                                <CardHeader
                                    avatar={
                                        <Avatar src={platform.img} />
                                    }
                                    title={platform.name}
                                />
                            </Card>
                        </IconButton>
                    })
                }
            </div>

            <div className='containers' >
                <h2>Select File</h2>
                {
                    inputs.map((input, i) => {
                        return <IconButton key={i} onClick={() => ClickedComponent(input)} >
                            <Card variant="outlined" style={{ display: "flex", alignItems: "center" }} >
                                <CardHeader
                                    avatar={
                                        <Avatar src={input.img} />
                                    }
                                    title={input.name}
                                />
                            </Card>
                        </IconButton>
                    })
                }
            </div>
            <div className='containers' >
                <h2>Select Timer</h2>
                {
                    timer.map((timer) => {
                        return <IconButton key={timer.name} onClick={() => ClickedComponent(timer)} >
                            <Card variant="outlined" style={{ display: "flex", alignItems: "center" }} >
                                <CardHeader
                                    avatar={
                                        <Avatar src={timer.img} />
                                    }
                                    title={timer.name}
                                />
                            </Card>
                        </IconButton>
                    })
                }
            </div>
        </div>
    )
}

export default LeftSiderBarCampaign