import { combineReducers } from 'redux';
import facebookUser from './facebookReducer';
import instagramUser from './instagramToken';
import linkedInUser from './linkedInreducer';
import userLoggedIn from './logInState';

export const rootReducer = combineReducers({
    userLoggedIn: userLoggedIn,
    linkedInUser: linkedInUser,
    facebookUser: facebookUser,
    instagramUser: instagramUser
})

export type RootState = ReturnType<typeof rootReducer>