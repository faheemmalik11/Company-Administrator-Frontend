import { IaddFinanceCategory } from 'app/interfaces/add_financeCategories';
import config from '../config/config'
import axios from "../utils/axios";

interface IdeleteIncrement{
    emp_id?: number | undefined,
    id?: number | undefined
}
interface IgetSingleIncrement{
    emp_id?: number | undefined,
    id?: string | undefined
}
interface IupdateIncrementHistory {
    emp_id?: number | undefined,
    id?: string | undefined,
    increment_amount?: number | undefined,
    increment_effective_date?: string | undefined,
    notes?: string | undefined,
}
export const getIncrementHistoryById = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/employee_increment_history/${id}`
        );

        console.log('data: ', data);
        console.log('data employee', data.IncrementHistory);
      
        return data.IncrementHistory;
    } catch (error) {
        console.log('error in get increment history by id', error);
        return null;
    }
};

export const deleteIncrementHistoryById = async (body: IdeleteIncrement) => {
    console.log('delete body', body)
    try {
        const  response: any = await axios.delete(
            `${config.defaults.api_url}/company/delete_employee_increment/${body.emp_id}/${body.id}`//, {data: body}
        );

        console.log('data: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete increment history by id', error);
        return null;
    }
};

export const getSingleIncrementHistory = async (body: IgetSingleIncrement) => {
    //console.log('body',body)
    try {
        const response: any = await axios.get(
            `${config.defaults.api_url}/company/employee_increment_single_history/${body.emp_id}/${body.id}`
        );

        console.log('data: ', response);
        console.log('data employee', response.data.IncrementHistory);
      
        return response.data.IncrementHistory;
    } catch (error) {
        console.log('error in get single increment history', error);
        return null;
    }
};

export const updateIncrementHistory = async (body: IupdateIncrementHistory, emp_id:any, id:any) => {
    console.log('body',body)
    try {
        const response: any = await axios.post(
            `${config.defaults.api_url}/company/update_employee_increment/${emp_id}/${id}`, body
        );

        console.log('data: ', response);
        console.log('data employee', response.data);
      
        return response;
    } catch (error) {
        console.log('error in get single increment history', error);
        return null;
    }
};

