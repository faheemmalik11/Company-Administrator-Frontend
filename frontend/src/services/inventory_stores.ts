import { IaddStore } from 'app/interfaces/inventory_addStore';
import config from '../config/config'
import axios from "../utils/axios";

export const getAllStores = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/store_list`
        );

        console.log('data from stores: ', data);
        console.log('data ', data.Stores);
      
        return data.Stores;
    } catch (error) {
        console.log('error in get data from stores', error);
        return null;
    }
};

export const addInventoryStore = async (body: IaddStore) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/create_store`, body
        );

        console.log('data from add inventory store: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add inventory store', error);
        return null;
    }
};
