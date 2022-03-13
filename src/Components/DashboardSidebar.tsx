import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import AddPostModal from './AddPostModal';

const DashboardSidebar: FC = () => {
    const [addPostModal, setaddPostModal] = useState<boolean>(false);

    return (
        <>
            {addPostModal && <AddPostModal setaddPostModal={setaddPostModal} />}
            <div className='dashboard__sidebar' >
                <ul>
                    <li>
                        <Link to={`/dashboard/LinkedIn`} >
                            <Button color="primary" variant="contained" >
                                LinkedIn
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/Instagram`} >
                            <Button color="secondary" variant="contained" >
                                Instagram
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/Twitter`} >
                            <Button variant="contained" >
                                Twitter
                            </Button>
                        </Link>
                    </li>
                </ul>
                {/* <button onClick={() => setaddPostModal(true)} className='login_form_btn' style={{ fontWeight: "bold", width: "100%" }} >Add A Post</button> */}
                <Link to="/createcampaign" >
                    <button className='login_form_btn' style={{ fontWeight: "bold", width: "100%" }} >Create A Campaign</button>
                </Link>
            </div>
        </>
    )
}

export default DashboardSidebar
