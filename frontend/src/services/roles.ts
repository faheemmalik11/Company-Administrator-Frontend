import config from 'config/config'
import axios from "utils/axios";

export const getCompanyRoles = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/roles/`
        );

      
        return data.roles;
    } catch (error) {
        console.log('error in fetching roles', error);
        return null;
    }
};