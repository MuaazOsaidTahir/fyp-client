export enum userLoggedInStates {
    user = "User_LoggedIn",
    remove = "User_SignedOut"
}

interface EmailType{
    email: string,
    subscription_status: string
}

export interface ActionType {
    type: userLoggedInStates,
    payload: EmailType | any,
}

function userLoggedIn(state: EmailType | null = null, action: ActionType): EmailType | null {
    const { type, payload } = action;
    switch (type) {
        case userLoggedInStates.user:
            return payload;

        case userLoggedInStates.remove:
            return null

        default:
            return state
    }
}

export default userLoggedIn