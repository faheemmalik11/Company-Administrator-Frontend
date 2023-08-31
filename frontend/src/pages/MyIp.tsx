import {FC} from 'react'
import IPage from '../app/interfaces/pages';
import MyIp from '../components/myIP';
import MyIpInfo from '../components/myIpInfo';

const MyIpPage: FC<IPage> = () => {
    return <>
        <MyIp />
        <MyIpInfo />
    </>
}

export default MyIpPage