
export enum LinkedInStates {
    user = "LinkedIn_LoggedIn",
    remove = "LinkedIn_SignedOut"
}

export interface DataLinkedIn {
    accessToken: string,
    userId: string
}

export interface ActionType {
    type: LinkedInStates,
    payload: DataLinkedIn,
}

function linkedInUser(state: DataLinkedIn | null = null, action: ActionType): DataLinkedIn | null {
    const { type, payload } = action;
    switch (type) {
        case LinkedInStates.user:
            return payload;

        default:
            return state
    }
}

export default linkedInUser