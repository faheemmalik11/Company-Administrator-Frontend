import { MyIP, MyIPInfo } from 'app/interfaces/Ip';
import http from 'services/core/HttpService';
// import apiConstants from "../constants/ApiConstant";

export const getMyIp = async () => {
    try {
        const result = await http.get<MyIP>(`https://api.ipify.org/?format=json`);
        return Promise.resolve(result);
    }
    catch (error) {
        return Promise.resolve(null);
    }
}

export const getMyIpInfo = async (ip: string) => {
    try {
        const result = await http.get<MyIPInfo>(`/${ip}/geo`);
        return Promise.resolve(result);
    }
    catch (error) {
        return Promise.resolve(null);
    }
}