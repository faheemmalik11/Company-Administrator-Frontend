import { IaddCategory } from 'app/interfaces/inventory_addCategory';
import config from '../config/config'
import axios from "../utils/axios";

export const getAllCategories = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/category_list`
        );

        console.log('data from categories: ', data);
        console.log('data ', data.category_list);
      
        return data.category_list;
    } catch (error) {
        console.log('error in get data from categories', error);
        return null;
    }
};

export const addInventoryCategory = async (body: IaddCategory) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/create_category`, body
        );

        console.log('data from add inventory category: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add inventory category', error);
        return null;
    }
};

export const getInventoryCategorybyId = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/category/${id}`
        );

        console.log('data from inventory category by id: ', data);
        console.log('data ', data.category);
      
        return data.category;
    } catch (error) {
        console.log('error in inventory category by id', error);
        return null;
    }
};

export const updateInventoryCategory = async (body: IaddCategory, category_id: any) => {
    try {
        const  response: any = await axios.patch(
            `${config.defaults.api_url}/update_category/${category_id}`, body
        );

        console.log('update data from inventory category: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update inventory category', error);
        return null;
    }
};