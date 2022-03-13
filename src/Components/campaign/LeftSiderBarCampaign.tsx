import React, { FC } from 'react'
import "./LeftSiderBarCampaign.css"
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { Avatar, CardHeader } from '@mui/material';

let platforms = [
    {
        name: "LinkedIn",
        color: 'blue',
        img: 'https://pngimg.com/uploads/linkedIn/linkedIn_PNG38.png',
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
        name: 'Input File',
        img: 'https://res.cloudinary.com/muaaz/image/upload/v1646013261/download_ecqagq.jpg',
        type: "input"
    }
]

interface Props {
    ClickedComponent: (para: any) => void
}

const LeftSiderBarCampaign: FC<Props> = ({ ClickedComponent }) => {
    return (
        <div className='LeftSiderBarCampaign' >
            <h3>Platforms</h3>
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

            <h3>Select File</h3>
            {
                inputs.map((input, i) => {
                    return <IconButton key={i} onClick={() => ClickedComponent(input)} >
                        <Card variant="outlined" style={{display: "flex", alignItems: "center"}} >
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
    )
}

export default LeftSiderBarCampaign