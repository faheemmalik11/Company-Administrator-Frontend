import config from '../config/config'
import axios from "../utils/axios";
import IStatus from 'app/interfaces/status';
export const getCompanyStatus = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/status/`
        );

        console.log(data)
        return data.roles;
    } catch (error) {
        console.log('error in fetching status', error);
        return null;
    }
};
export const updateCompanyStatus = async (body: IStatus) => {
    console.log('body',body)
    try {
        const response: any = await axios.post(
            `${config.defaults.api_url}/company/update_employee_status`,
            body
        );

        console.log(response)
        return response
    } catch (error) {
        console.log('error in fetching status', error);
        return null;
    }
};