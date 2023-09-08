import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectMyIp, selectMyIpInfo, getMyIpInfoAction,  } from "app/reducer/IpSlice";

const MyIPInfo: FC = () => {
    const dispatch = useAppDispatch();
    const ip = useAppSelector(selectMyIp);
    const ipInfo = useAppSelector(selectMyIpInfo);

    useEffect(() => {
        ip && dispatch(getMyIpInfoAction(ip));
    }, [ip]);

    console.log({ ipInfo });

    return (
        <div>
            <h1>
                My IP Info
            </h1>
            {/* <h1>{ip}</h1> */}
        </div>
    )
};

export default MyIPInfo;