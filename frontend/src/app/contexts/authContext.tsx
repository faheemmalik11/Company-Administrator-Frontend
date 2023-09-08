import { createContext, useReducer } from 'react';
import cookie from 'js-cookie'

import IProvider from 'app/interfaces/provider';
import { IAuth } from 'app/interfaces/auth';
import { AuthActions, AuthReducer } from 'app/reducer/auth';


const AuthContext = createContext <IAuth> (null!);
export default AuthContext;

const system_token = cookie.get("system_token");
const system_user = cookie.get("system_user");

export const AuthInitState: IAuth = {
    token: system_token ? system_token : '',
    setToken: () => {},
    user: system_user ? JSON.parse(system_user) : {
        id: null!,
        status: null!,

        name: '',
        slug: '',
        email: '',
        website: '',
        address: '',
        phone: '',
        created_at: '',
        updated_at: '',

        roles: [],
    },
    
    setUser: () => {},

    logout: () => {},
};

export const AuthProvider = (props: IProvider) => {
    const [{ token, user }, dispatch] = useReducer(AuthReducer, AuthInitState);

    const setToken = (token: string) => {
        dispatch({
            type: AuthActions.SET_TOKEN,
            payload: token,
        });
    };

    const setUser = (user: any) => {
        console.log('user: ', user);
        dispatch({
            type: AuthActions.SET_USER,
            payload: user
        });
    }

    const removeAuthCookies = () => {
        cookie.remove('system_token');
        cookie.remove('system_user');
    };

    const logout = () => {
        console.log('logout dispatched');
        
        dispatch({
            type: AuthActions.LOGOUT,
            payload: {}
        });

        removeAuthCookies();
        return true;
    }

    return (
        <>
            <AuthContext.Provider 
                value={{
                    token,
                    setToken,
                    user,
                    setUser,
                    logout,
                }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    );
};