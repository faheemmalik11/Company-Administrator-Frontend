import config from 'config/config'
import axios from "utils/axios";
import cookie from 'js-cookie'

interface ILogin {
    email?: string | undefined, password?: string | undefined
}

export const login = async (body: ILogin) => {
    let response: any
    try {
        response = await axios.post(
            `${config.defaults.api_url}/company/login`,
            body
        );

        console.log('response: ', response);
        console.log('response data: ', response.data);

        if (response.data.user && response.data.token) {
            generateAuthCookies(response.data.user, response.data.token);
        }

        return response;
    } catch (error) {
        console.log("Error in [getSupportTickets] : ", error);
        return response;
    }
};

export const loginUser = async (body: ILogin) => {
    let response: any
    try {
        response = await axios.post(
            `${config.defaults.api_url}/login`,
            body
        );

        console.log('response: ', response);
        console.log('response data: ', response.data);

        if (response.data.user && response.data.token) {
            generateAuthCookies(response.data.user, response.data.token);
        }

        return response;
    } catch (error) {
        console.log("Error in [getSupportTickets] : ", error);
        return response;
    }
};

export const logout = async () => {
    resetAuthCookies();
    //     try {
    //     const  response: any = await axios.post(
    //         `${config.defaults.api_url}/logout`
    //     );

    //     console.log('data in logout: ', response);

    //     // if(data.user && data.token) {
    //     //     generateAuthCookies(data.user, data.token);
    //     // }

    //     return response;
    // } catch (error) {
    //     console.log("Error in [getSupportTickets] : ", error);
    //     return null;
    // }
}

// export const loginUser = async (body: ILogin) => {
//     try {
//         const  {data}: any = await axios.post(
//             `${config.defaults.api_url}/login`,
//             body
//         );

//         console.log('data: ', data);

//         if(data.user && data.token) {
//             generateAuthCookies(data.user, data.token);
//         }

//         return data;
//     } catch (error) {
//         console.log("Error in [getSupportTickets] : ", error);
//         return null;
//     }
// };

const generateAuthCookies = (authenticatedUser: any, token: string) => {
    const expire = new Date;
    expire.setHours(expire.getHours() + 4);
    console.log('cookie')
    cookie.set('system_token', token, { expires: expire });
    cookie.set('system_user', JSON.stringify(authenticatedUser), { expires: expire });
    console.log('cookie', cookie)
};
const resetAuthCookies = () => {

    cookie.remove('system_token')
    cookie.remove('system_user')
    console.log('cookie', cookie)
};