
export interface FacebookData {
    accessToken: string,
    userId: string
}

export interface FacebookActionType {
    type: string,
    payload: FacebookData
}

function facebookUser(state: FacebookData | null = null, action: FacebookActionType): FacebookData | null {
    const { type, payload } = action;
    switch (type) {
        case 'Facebook_AccessToken':
            return payload;

        default:
            return state
    }
}

export default facebookUser