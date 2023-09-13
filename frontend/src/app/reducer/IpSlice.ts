import { createSlice} from '@reduxjs/toolkit'
import { AppDispatch, AppState } from "../store";
import { getMyIp, getMyIpInfo } from 'services/IpService';

interface InitialState {
    myIp: string;
    myIpInfo: object
}

const initialState: InitialState = {
    myIp: null!,
    myIpInfo: null!
}

export const ipSlice = createSlice({
    name: 'ipReducer',
    initialState,
    reducers: {
        setMyIp: (state, { payload }) => {
            state.myIp = payload.ip
        },
        setMyIpInfo: (state, { payload }) => {
            state.myIpInfo = payload
        }
    }
})

export default ipSlice.reducer

export const { setMyIp, setMyIpInfo } = ipSlice.actions

export const selectMyIp = (state:AppState) => state.IpSlice.myIp;
export const selectMyIpInfo = (state:AppState) => state.IpSlice.myIpInfo;

export const getMyIpAction = () => async (dispatch: AppDispatch) => {

    const ip = await getMyIp();

    if(!ip){
        return;
    }

    dispatch(setMyIp(ip));
}

export const getMyIpInfoAction = (ip: string) => async (dispatch: AppDispatch) => {

    const ipInfo = await getMyIpInfo(ip);

    if(!ipInfo){
        return;
    }

    dispatch(setMyIpInfo(ipInfo));
}