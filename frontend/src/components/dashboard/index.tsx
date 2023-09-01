import React, { useContext, useEffect, useState } from "react";
import AuthContext from "app/contexts/authContext";
import Employees from "./employees";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SideBar from "components/side_bar";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [welcomeMessege, setWelcomeMessege] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>();
    console.log(navigate)
    useEffect(() => {
        if (user.roles.includes('all')) {
            setWelcomeMessege('Welcome super admin')
            setIsAdmin(true)
        }
        else {
            setWelcomeMessege('Welcome user')
        }
        if (location.state !== null) {
            setUpdateId(location.state.id);
        }
    })
    const handleAddEmployee = () => {
        navigate('/add_employee')
    }
    return <React.Fragment>
        <SideBar />
       
        
        <h1>{welcomeMessege}</h1>
        {isAdmin && <button onClick={handleAddEmployee}>Add new employee</button>}
        {/* <h2>{location.state.id}</h2> */}
        {isAdmin && <Employees update_id={updateId} />}
    
    </React.Fragment>
}

export default Dashboard;