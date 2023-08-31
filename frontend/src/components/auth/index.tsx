import { useEffect, useContext } from "react";
import AuthContext from "app/contexts/authContext";
import { useNavigate } from "react-router-dom";

const Auth = (props: any) => {
    const {token} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) navigate('/login');
    },[token]);

    useEffect(() => {
        console.log('token: ', token)
    });

    return <>
        {
            token && <>
                {props.children}
            </>
        }
    </>
}

export default Auth;