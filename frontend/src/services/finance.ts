import { IaddFinance } from 'app/interfaces/add_finance';
import config from 'config/config'
import axios from "utils/axios";

export const getAllFinanceData = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/finance/`
        );

        console.log('data from finance: ', data);
        console.log('data ', data.finance);
      
        return data.finance;
    } catch (error) {
        console.log('error in finance', error);
        return null;
    }
};

export const getFinanceDatabyId = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/finance/${id}`
        );

        console.log('data from finance by id: ', data);
        console.log('data ', data.finance);
      
        return data.finance;
    } catch (error) {
        console.log('error in finance data by id', error);
        return null;
    }
};

export const getAllFinanceCategories = async () => {
    try {
        const  response: any = await axios.get(
            `${config.defaults.api_url}/company/finance_category`
        );

        console.log('data from finance category: ', response);
       // console.log('data ', data.finance);
      
        return response.data;
    } catch (error) {
        console.log('error in get finance category', error);
        return null;
    }
};

export const addFinanceData = async (body: IaddFinance) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/company/finance/`, body
        );

        console.log('data from add finance: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add finance', error);
        return null;
    }
};

export const updateFinanceData = async (body: IaddFinance, finance_id: any) => {
    try {
        const  response: any = await axios.patch(
            `${config.defaults.api_url}/company/finance/${finance_id}`, body
        );

        console.log('update data from finance: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update finance', error);
        return null;
    }
};

export const deleteFinanceDataById = async (id: number | undefined) => {
    try {
        const  response: any = await axios.delete(
            `${config.defaults.api_url}/company/finance/${id}`
        );

        console.log('data: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete finance by id', error);
        return null;
    }
};