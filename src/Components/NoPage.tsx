import { Button } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import "./NoPage.css"

const NoPage: FC = () => {
    return (
        <>
            <Header login={true} signup={true} />
            <div className='No_Page_Container' >
                <img src='https://res.cloudinary.com/djdcv17qb/image/upload/v1650316036/undraw_page_not_found_re_e9o6_t619ew.svg' alt='404 Page' />
                <Link to="/" >
                    <Button variant="contained" color='primary' > Go Back To Home </Button>
                </Link>
            </div>
        </>
    )
}

export default NoPage