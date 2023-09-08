import { IcompanySetting } from 'app/interfaces/companySetting';
import { IresetPassword } from 'app/interfaces/resetPassword';
import config from 'config/config'
import axios from "utils/axios";

export const updateCompany = async (body: IcompanySetting, company_id: any) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/company/update`, body
        );

        console.log('update data from update company setting: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update company setting', error);
        return null;
    }
};

export const resetCompanyPassword = async (body: IresetPassword) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/company/reset_password`, body
        );

        console.log('update data from company reset password: ', response);
      
        return response;
    } catch (error) {
        console.log('error in reset password', error);
        return null;
    }
};