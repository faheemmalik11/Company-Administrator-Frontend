export enum AuthActions {
    SET_TOKEN = 'SET_TOKEN',
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
}

export const AuthReducer = (state: any, action: any) => {
    const {type, payload} = action;

    switch(type) {
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: payload
            }

        case AuthActions.SET_USER:
            return {
                ...state,
                user: payload
            }
        default:
            return state;
    }
} 