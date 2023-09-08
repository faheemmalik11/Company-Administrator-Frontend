import { IaddFinanceCategory } from 'app/interfaces/add_financeCategories';
import config from 'config/config'
import axios from "utils/axios";

export const getAllFinanceCategories = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/finance_category`
        );

        console.log('data from finance categories: ', data);
        console.log('data ', data.finance_category);
      
        return data.finance_category;
    } catch (error) {
        console.log('error in get data from finance categories', error);
        return null;
    }
};

export const getFinanceCategorybyId = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/finance_category/${id}`
        );

        console.log('data from finance category by id: ', data);
        console.log('data ', data.finance_category);
      
        return data.finance_category;
    } catch (error) {
        console.log('error in finance category data by id', error);
        return null;
    }
};

export const addFinanceCategory = async (body: IaddFinanceCategory) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/company/finance_category`, body
        );

        console.log('data from finance: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add finance', error);
        return null;
    }
};

export const deleteFinanceCategoryById = async (id: number | undefined) => {
    try {
        const  response: any = await axios.delete(
            `${config.defaults.api_url}/company/finance_category/${id}`
        );

        console.log('data: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete finance by id', error);
        return null;
    }
};

export const updateFinanceCategory = async (body: IaddFinanceCategory, category_id: any) => {
    try {
        const  response: any = await axios.patch(
            `${config.defaults.api_url}/company/finance_category/${category_id}`, body
        );

        console.log('update data from finance category: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update finance category', error);
        return null;
    }
};