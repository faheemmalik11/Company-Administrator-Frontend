import axios from "axios";
import { toast } from 'react-toastify';
// import axiosRetry from "axios-retry";

// Global Axios Settings
axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_API_URL}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 10000;

// axios.interceptors.request.use(async (config: any) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("system_token")}`;
//     return config;
// });

axios.interceptors.response.use(
    (value): any => {
        return Promise.resolve(value.data)
    },
    (error) => {
        console.log({ error: error.response });
        toast.error(error?.response.data?.message);
        return Promise.reject(error);
    }
);

// axiosRetry(axios, {
//     retries: 500000,
//     retryDelay: (retryCount: number) => retryCount * 1000,
//     shouldResetTimeout: true,
//     retryCondition: (error: { response: any; }) => {
//         if (error) {
//             const { response } = error
//             if (response)
//                 return !(response?.status >= 400 && response.status < 500)
//         }
//         return true
//     }
// })

const http = {
    request: axios.request,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};

export default http;
