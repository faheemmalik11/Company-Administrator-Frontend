import config from '../config/config'
import axios from "../utils/axios";

export const getAllItems = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/item_list`
        );

        console.log('data from items: ', data);
        console.log('data ', data.item_list);
      
        return data.item_list;
    } catch (error) {
        console.log('error in get data from items', error);
        return null;
    }
};