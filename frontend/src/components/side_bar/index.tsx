import { useContext, useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from 'app/contexts/authContext';
import { logout } from 'services/auth';
import { useLocation } from 'react-router-dom';
interface Props {
    setIsEmployee: (val: boolean) => void;
    setIsFinance: (val: boolean) => void;
    setIsFinanceCategories: (val: boolean) => void;
    setIsItem: (val: boolean) => void;
    setIsCategory: (val: boolean) => void;
    setIsStore: (val: boolean) => void;
    setIsTeam: (val: boolean) => void;
    isEmployee: boolean;
    isFinance: boolean;
    isFinanceCategories: boolean;
    isItem: boolean;
    isCategory: boolean;
    isStore: boolean;
    isTeam: boolean
}

const SideBar: React.FC<Props> = ({
    setIsFinance,
    setIsFinanceCategories,
    setIsCategory,
    setIsItem,
    setIsStore,
    setIsEmployee,
    setIsTeam,
    isEmployee,
    isFinance,
    isFinanceCategories,
    isItem,
    isCategory,
    isStore,
    isTeam }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        if (user.roles.includes('all')) {
            setIsAdmin(true);
        }
    });
    const logoutHandler = () => {
        logout();
        if (user.roles.includes('all')) {
            navigate('/companylogin');
        } else {
            navigate('/login');
        }
    };

    const menuHandler = () => {
        if (location.state !== null) {
            location.state = null;
        }
    }

    const employeeHandler = () => {
        setIsEmployee(true)
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(false);
    }
    const financeHandler = () => {
        setIsEmployee(false)
        setIsFinance(true);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(false);
    }

    const financeCategoryHandler = () => {
        setIsEmployee(false)
        setIsFinance(false);
        setIsFinanceCategories(true);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(false);
    }

    const storeHandler = () => {
        setIsEmployee(false)
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(true);
        setIsTeam(false);
    }

    const categoryHandler = () => {
        setIsEmployee(false)
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(true);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(false);
    }

    const itemHandler = () => {
        setIsEmployee(false)
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(true);
        setIsStore(false);
        setIsTeam(false);
    }

    const teamHandler = () => {
        setIsEmployee(false)
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(true);
    }
    return (
        <Sidebar>
            <Menu onClick={menuHandler}
            // menuItemStyles={{
            //   button: {
            //     // the active class will be added automatically by react router
            //     // so we can use it to style the active menu item
            //     [`&.active`]: {
            //       backgroundColor: '#13395e',
            //       color: '#b6c8d9',
            //     },
            //   },
            // }}
            >
                {isAdmin && (
                    <>
                        {/* <MenuItem component={<Link to="/Dashboard" />}>Company Employee Section</MenuItem> */}
                        <MenuItem className={(isEmployee)?'bg-sky-500/100':''} onClick={employeeHandler}>
                            Company Employee Section
                        </MenuItem>
                        <SubMenu label="Finance Section">
                            <MenuItem className={(isFinance)?'bg-sky-500/100':''} onClick={financeHandler} >
                                Finance Data
                            </MenuItem>
                            <MenuItem className={(isFinanceCategories)?'bg-sky-500/100':''} onClick={financeCategoryHandler}>
                                Categories Data
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="Inventory Section">
                            <MenuItem className={(isStore)?'bg-sky-500/100':''} onClick={storeHandler}>
                                Stores
                            </MenuItem>
                            <MenuItem className={(isCategory)?'bg-sky-500/100':''} onClick={categoryHandler}>
                                Categories
                            </MenuItem>
                            <MenuItem className={(isItem)?'bg-sky-500/100':''} onClick={itemHandler}>
                                Items
                            </MenuItem>
                        </SubMenu>
                        <MenuItem className={(isTeam)?'bg-sky-500/100':''} onClick={teamHandler}>
                            Team Section
                        </MenuItem>{' '}
                    </>
                )}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
        </Sidebar>
    );
};
export default SideBar;
