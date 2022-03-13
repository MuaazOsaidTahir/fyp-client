import { combineReducers } from 'redux';
import linkedInUser from './linkedInreducer';
import userLoggedIn from './logInState';

export const rootReducer = combineReducers({
    userLoggedIn: userLoggedIn,
    linkedInUser: linkedInUser
})

export type RootState = ReturnType<typeof rootReducer>