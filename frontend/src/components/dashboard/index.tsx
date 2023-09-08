import React, { useContext, useEffect, useState } from "react";
import AuthContext from "app/contexts/authContext";
import Employees from "./employees";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SideBar from "components/side_bar";
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
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [welcomeMessege, setWelcomeMessege] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>();
    const [isEmployee, setIsEmployee] = useState<boolean>(true);
    const [isFinance, setIsFinance] = useState<boolean>(false);
    const [isFinanceCategories, setIsFinanceCategories] = useState<boolean>(false);
    const [isItem, setIsItem] = useState<boolean>(false);
    const [isCategory, setIsCategory] = useState<boolean>(false);
    const [isStore, setIsStore] = useState<boolean>(false);
    const [isTeam, setIsTeam] = useState<boolean>(false);

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
        {/* <SideBar
            isEmployee={isEmployee} setIsEmployee={setIsEmployee}
            isFinance={isFinance} setIsFinance={setIsFinance}
            isFinanceCategories={isFinanceCategories} setIsFinanceCategories={setIsFinanceCategories}
            isItem={isItem} setIsItem={setIsItem}
            isCategory={isCategory} setIsCategory={setIsCategory}
            isStore={isStore} setIsStore={setIsStore}
            isTeam={isTeam} setIsTeam={setIsTeam} /> */}

        <SideBAR 
        isEmployee={isEmployee} setIsEmployee={setIsEmployee}
        isFinance={isFinance} setIsFinance={setIsFinance}
        isFinanceCategories={isFinanceCategories} setIsFinanceCategories={setIsFinanceCategories}
        isItem={isItem} setIsItem={setIsItem}
        isCategory={isCategory} setIsCategory={setIsCategory}
        isStore={isStore} setIsStore={setIsStore}
        isTeam={isTeam} setIsTeam={setIsTeam}/>


        <h1>{welcomeMessege}</h1>
        {isAdmin && 
        <>
            {isEmployee && <Employees update_id={updateId} />}
            {isFinance && <Finance />}
            {isFinanceCategories && <FinanceCategories />}
            {isStore && <Store />}
            {isCategory && <Categories />}
            {isItem && <Items />}
            {isTeam && <Teams />}
        </>}

        <Footer />
    </React.Fragment>
}

export default Dashboard;