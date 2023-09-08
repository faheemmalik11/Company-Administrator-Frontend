import {FC} from 'react'
// import IPage from 'interfaces/page';

import IPage from 'app/interfaces/page';
// import Login from 'components/login/Login';
import LoginCompany from 'components/login/LoginCompany';

const CompanyLoginPage: FC<IPage> = () => {
    return <LoginCompany />;
}

export default  CompanyLoginPage