import { IaddItem } from 'app/interfaces/inventory_addItem';
import config from 'config/config'
import axios from "utils/axios";

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

export const addInventoryItem = async (body: IaddItem) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/create_item`, body
        );

        console.log('data from add inventory item: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add inventory item', error);
        return null;
    }
};

export const getInventoryItembyId = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/item/${id}`
        );

        console.log('data from inventory item by id: ', data);
        console.log('data ', data.item);
      
        return data.item;
    } catch (error) {
        console.log('error in inventory item by id', error);
        return null;
    }
};

export const updateInventoryItem = async (body: IaddItem, item_id: any) => {
    try {
        const  response: any = await axios.patch(
            `${config.defaults.api_url}/update_item/${item_id}`, body
        );

        console.log('update data from inventory item: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update inventory item', error);
        return null;
    }
};