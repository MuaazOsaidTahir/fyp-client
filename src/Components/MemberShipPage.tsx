import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import "./MemberShipPage.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios';
import { RootState } from '../reducer';
import { useSelector } from 'react-redux';

const MemberShipPage: FC = () => {
    const [loggedIn, setloggedIn] = useState<boolean>(true)
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    let navigate = useNavigate();

    console.log(userState);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/logIn?query=login')
        }
    }, [])

    const checkOutForPayment = async (id: string, amount: number) => {
        const res = await axios('http://localhost:8000/create-checkout', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            data: JSON.stringify({ email: userState.email, amount: amount, productId: id })
        })

        console.log(res)

        window.location.href = res.data.url
    }

    return (
        <>
            <Header login={true} signup={true} />
            <div className='memberShip' >
                <p className='membership__notification' ><strong>At the moment we are only offering one Package!!</strong></p>
                <div className='membership__planning' >
                    <div className='membership__text' >
                        <h1>Plans & Pricing</h1>
                        <p>Whether your time-saving automation needs are large or small, we’re here to help you scale.</p>
                    </div>
                    <div className='membership__card card_style' >
                        <Card variant="outlined" style={{ width: "30rem", textAlign: "center" }} >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    All in One Package
                                </Typography>
                                <div className='membership__typography' >
                                    <Typography variant="h3" component="div">
                                        <span>$</span>10
                                    </Typography>
                                    <small>per month</small>
                                </div>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Start Automating Your Accounts.
                                </Typography>
                                <Typography variant="body2">
                                    <ul className='membership__list' >
                                        <li><CheckCircleIcon style={{ color: "#62D493" }} /> Get All Accounts </li>
                                        <li><CheckCircleIcon style={{ color: "#62D493" }} /> Easily Automate the tasks </li>
                                        <li><CheckCircleIcon style={{ color: "#62D493" }} /> Expand Your Skills </li>
                                    </ul>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button style={{ width: "100%", fontWeight: "bold", color: "white", backgroundColor: "#635BFF" }} onClick={() => checkOutForPayment('prod_LG76FhvtBUuEk4', 10)} >Purchase</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberShipPage
