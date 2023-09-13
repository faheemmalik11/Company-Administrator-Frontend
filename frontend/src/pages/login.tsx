import {FC} from 'react'
// import IPage from 'interfaces/page';

import IPage from 'app/interfaces/pages';
// import Login from 'components/login/Login';
import Login from '../components/login/LoginUser';

const LoginPage: FC<IPage> = () => {
    return <Login />;
}

export default  LoginPage