import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import HomePage from './Components/HomePage';
import LogIn from './Components/LogIn';
import MemberShipPage from './Components/MemberShipPage';
import SignUp from './Components/SignUp';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, useEffect, useState } from 'react';
import { ActionType, userLoggedInStates } from './reducer/logInState';
import { signedUpUser } from './apis/api';
import Loader from 'react-loader-spinner';
import CampaignPage from './Components/campaign/CampaignPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserCampaigns from './Components/UserCampaigns';
import { RootState } from './reducer';
import NoPage from './Components/NoPage';

function App() {
  const { data, error } = useQuery(signedUpUser)
  const [loading, setloading] = useState(true)
  const dispatch: Dispatch<ActionType> = useDispatch();
  const userState = useSelector((store: RootState) => store.userLoggedIn)

  useEffect(() => {
    if (data) {
      if (data.getsignedInUser) {
        dispatch({ type: userLoggedInStates.user, payload: data.getsignedInUser })
      }
      setloading(false)
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setloading(false)
    }
  }, [error])

  const Notify = () => (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )

  return (
    <div className="App">
      <BrowserRouter>
        {
          loading ?
            <div className='homePage_loader' >
              <Loader type="TailSpin" color="#FF4A00" height={80} width={80} />
            </div>
            : userState ?
              <Routes>
                <Route path="/" element={<><Notify /><HomePage /></>} />
                <Route path="/logIn" element={<><Notify /><LogIn /></>} />
                <Route path="/signUp" element={<><Notify /><SignUp /></>} />
                <Route path="/dashboard" element={<><Notify /><Dashboard toggle={false} /></>} />
                <Route path="/dashboard/:platformName" element={<><Notify /><Dashboard toggle={true} /></>} />
                <Route path="/membership" element={<><Notify /><MemberShipPage /></>} />
                <Route path="/createcampaign" element={<><Notify /><CampaignPage /></>} />
                <Route path="/usercampaigns" element={<><Notify /><UserCampaigns /></>} />
                <Route path='*' element={<NoPage />} />
              </Routes> :
              <Routes>
                <Route path="/" element={<><Notify /><HomePage /></>} />
                <Route path="/logIn" element={<><Notify /><LogIn /></>} />
                <Route path="/signUp" element={<><Notify /><SignUp /></>} />
                <Route path='*' element={<NoPage />} />
              </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
