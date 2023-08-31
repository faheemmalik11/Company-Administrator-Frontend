import config from '../config/config'
import axios from "../utils/axios";
import { IupdateCompanyEmployee } from 'app/interfaces/updateCompanyEmployee';
import { IregisterCompanyEmployee } from 'app/interfaces/registerCompanyEmployee';


interface IEmail {
    email?: string | undefined,
    id?: string | undefined
}
interface ICnic {
    cnic?: string | undefined,
    id?: string | undefined
}

export const getCompanyEmployees = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/employees`
        );

        console.log('data: ', data);
        console.log('data employee', data.employees);
      
        return data.employees;
    } catch (error) {
        console.log('error is dasboard', error);
        return null;
    }
};
export const getCompanyEmployeeById = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/company/employee/${id}`
        );

        console.log('data: ', data);
        console.log('data employee', data.employee);
      
        return data.employee;
    } catch (error) {
        console.log('error in get company employee by id', error);
        return null;
    }
};
export const updateCompanyEmployee = async (body: IupdateCompanyEmployee, emp_id: string | undefined) => {
    console.log('employee pass', body);
    try {
        const response: any = await axios.post(`${config.defaults.api_url}/company/update_employee/${emp_id}`, body);

        console.log('data: ', response);
          return response;
    } catch (error) {
        
        console.log('error is dasboard', error);
        return null;
    }
};
export const registerCompanyEmployee = async (body: IregisterCompanyEmployee) => {
    console.log('employee pass', body);
    try {
        const response: any = await axios.post(`${config.defaults.api_url}/company/register_employee`, body);

        console.log('data: ', response);
          return response;
    } catch (error) {
        
        console.log('error in register company employees', error);
        return null;
    }
};

export const uniqueEmail = async (body: IEmail) => {
    try {
        const response: any = await axios.post(`${config.defaults.api_url}/company/check_email`, body);
        console.log('response',response)
          return response;
    } catch (error) {
        
        console.log('error in check uniqueness of email', error);
        return null;
    }
};
export const uniqueCnic = async (body: ICnic) => {
    try {
        const response: any = await axios.post(`${config.defaults.api_url}/company/check_cnic`, body);
        console.log(response)
          return response;
    } catch (error) {
        
        console.log('error in check uniqueness of cnic', error);
        return null;
    }
};

export const deleteCompanyEmployeeById = async (id: number | undefined) => {
    try {
        const  response: any = await axios.delete(
            `${config.defaults.api_url}/company/delete_employee/${id}`
        );

        console.log('data: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete employee by id', error);
        return null;
    }
};