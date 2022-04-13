import { FacebookActionType, FacebookData } from "./facebookReducer";


function instagramUser(state: FacebookData | null = null, action: FacebookActionType): FacebookData | null {
    const { type, payload } = action;
    switch (type) {
        case 'Instagram_AccessToken':
            console.log(payload);
            return payload;

        default:
            return state
    }
}

export default instagramUser