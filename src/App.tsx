import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import HomePage from './Components/HomePage';
import LogIn from './Components/LogIn';
import MemberShipPage from './Components/MemberShipPage';
import SignUp from './Components/SignUp';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Dispatch, useEffect, useState } from 'react';
import { ActionType, userLoggedInStates } from './reducer/logInState';
import { signedUpUser } from './apis/api';
import Loader from 'react-loader-spinner';
import CampaignPage from './Components/campaign/CampaignPage';

function App() {
  const { data, error } = useQuery(signedUpUser)
  const [loading, setloading] = useState(true)
  const dispatch: Dispatch<ActionType> = useDispatch();

  useEffect(() => {
    if (data) {
      if (data.getsignedInUser) {
        dispatch({ type: userLoggedInStates.user, payload: data.getsignedInUser })
        setloading(false)
      }
      else {
        setloading(false)
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setloading(false)
    }
  }, [error])

  return (
    <div className="App">
      <BrowserRouter>
        {
          loading ?
            <div className='homePage_loader' >
              <Loader type="TailSpin" color="#FF4A00" height={80} width={80} />
            </div>
            :
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard toggle={false} />} />
              <Route path="/dashboard/:platformName" element={<Dashboard toggle={true} />} />
              <Route path="/membership" element={<MemberShipPage />} />
              <Route path="/createcampaign" element={<CampaignPage />} />
            </Routes>}
      </BrowserRouter>
    </div>
  );
}

export default App;
