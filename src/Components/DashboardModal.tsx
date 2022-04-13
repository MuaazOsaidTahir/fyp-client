import React, { useState } from 'react'
import "./DashboardModal.css"
import TextField from '@mui/material/TextField';

function DashboardModal() {
    const [campaignname, setcampaignname] = useState('')
    
    return (
        <div className='DashboardModal' >
            <h2>Give Your Campaign A Name.</h2>
            <TextField
                id="outlined-name"
                label="Campaign Name"
                value={campaignname}
                onChange={(e) => setcampaignname(e.target.value)}
            />
        </div>
    )
}

export default DashboardModal