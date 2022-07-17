import React, { FC, useEffect, useState } from 'react'
import Header from './Header'
import "./HomePage.css"
import { Waypoint } from 'react-waypoint';
import Loader from "react-loader-spinner";
import { useSearchParams } from 'react-router-dom';
import { notificationToastify, Options } from '../tostify/toastify';

const HomePage: FC = (): JSX.Element => {
    const [animate, setanimate] = useState<boolean>(false)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get('session_id')){
            notificationToastify(`Membership Successfully Purchased`, Options.SUCCESS )
        }
    }, [searchParams])

    return (
        <>
            <Header signup={true} login={true} />
            <div className='HomePage' >
                <div style={{margin: "1rem"}} className='card_style' >
                    <section className='homepage__topsection' >
                        <div className='homepage_right' >
                            <h1>Connect your accounts and manage all at one place</h1>
                            <h2>Easy handling of accounts. SMM allows you to manage and go through the posts of your social media from one web application, so you don't have to go through different applications.</h2>
                        </div>
                        <div className='homepage_left' >
                            <img src='https://res.cloudinary.com/djdcv17qb/image/upload/v1640198310/Untitled_Diagram.drawio_wweznm.png' alt="Home Page" />
                        </div>
                    </section>
                    <section className='homepage__integrations' >
                        <h4>Social Media Platforms Integrated in our application!!</h4>
                        <div className='socialmedia__images' >
                            <img src="https://res.cloudinary.com/djdcv17qb/image/upload/v1648857866/insta_1_w0rtnq.png" alt="Instagram" />
                            {animate && <Loader type="ThreeDots" color="#F04600" height={80} width={80} />}

                            <img src="https://res.cloudinary.com/djdcv17qb/image/upload/v1648857865/twitter_czjxkm.png" alt="Twitter" />
                            {animate && <Loader type="ThreeDots" color="#F04600" height={80} width={80} />}
                            <img src="https://res.cloudinary.com/djdcv17qb/image/upload/v1648857865/fb_gjneqr.png" alt="Facebook" />
                        </div>
                        <Waypoint onEnter={() => setanimate(true)} />
                    </section>
                    <section className='why__smm' >
                        <h4>Why SMM?</h4>
                        <p>SMM is a web-based application in which different social media application api’s will be integrated, and user can manage view the posts and insights of the posts from that same application. The user will be able to upload the posts to different social media applications from same application and can also automate the posts, when to be uploaded.</p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default HomePage
