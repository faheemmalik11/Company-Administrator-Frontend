import React, { useContext, useEffect, useState } from "react";
import AuthContext from "app/contexts/authContext";
import Employees from "./employees";
import { useLocation } from 'react-router-dom';
import Finance from "components/finance";
import FinanceCategories from "components/finance_categories";
import Items from "components/Inventory/Items";
import Categories from "components/Inventory/Categories";
import Store from "components/Inventory/Stores";
import Teams from "components/Teams";
import Header from "components/header";
import Footer from "components/footer";
import SideBAR from "components/side_bar/Sidebar";

const Dashboard = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [welcomeMessege, setWelcomeMessege] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>();
  
    const [tableName, setTableName] = useState<string>('Employee');

    const getComponents = () => {
        const obj : any={
            Employee: <Employees update_id={updateId}/>,
            Finance: <Finance />,
            Team: <Teams/>,
            Item: <Items/>,
            Store: <Store />,
            Category: <Categories />,
            Finance_Categories: <FinanceCategories />
        }

        return obj[tableName];
    }
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

    return <React.Fragment>

        <Header />
        

        <SideBAR 
            tableName={tableName} 
            setTableName={setTableName} 
        />


        <h1>{welcomeMessege}</h1>
        {isAdmin &&
            <>
            {
                getComponents()
            }
                
            </>}

        <Footer />
    </React.Fragment>
}

export default Dashboard;