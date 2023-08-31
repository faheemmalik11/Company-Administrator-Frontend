import {FC} from 'react'
// import IPage from 'interfaces/page';

import IPage from 'interfaces/page';
// import Login from 'components/login/Login';
import Login from '../components/login/Login';

const LoginPage: FC<IPage> = () => {
    return <Login />;
}

export default  LoginPage