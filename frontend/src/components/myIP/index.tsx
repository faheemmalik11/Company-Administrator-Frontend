import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectMyIp, getMyIpAction } from "app/reducer/IpSlice";

const MyIP: FC = () => {
    const dispatch = useAppDispatch();
    const ip = useAppSelector(selectMyIp);

    useEffect(() => {
        dispatch(getMyIpAction());
    }, []);

    console.log("REACT_APP_API_URL", import.meta.env.VITE_REACT_APP_API_URL)

    return (
        <div>
            <h1>
                My IP
            </h1>
            <h1>{ip}</h1>
        </div>
    )
};

export default MyIP;