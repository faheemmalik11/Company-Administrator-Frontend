import { useContext, useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from 'app/contexts/authContext';
import { logout } from 'services/auth';

const SideBar = () => {
    const navigate = useNavigate();
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
    // const touchHandler = () => {
    //     console.log('abc');
    //     setInventoryMenu(true);
    // };
    return (
        <Sidebar>
            <Menu
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
                        <MenuItem component={<Link to="/Dashboard" />}>Company Employee Section</MenuItem>
                        <SubMenu label="Finance Section">
                            <MenuItem component={<Link to="/Finance" />}>Finance Data</MenuItem>
                            <MenuItem component={<Link to="/finance_categories" />}>Categories Data</MenuItem>
                        </SubMenu>
                        <SubMenu label="Inventory Section">
                            <MenuItem component={<Link to="/stores" />}>Stores</MenuItem>
                            <MenuItem component={<Link to="/categories" />}>Categories</MenuItem>
                            <MenuItem component={<Link to="/items" />}>Items</MenuItem>
                        </SubMenu>
                        <MenuItem component={<Link to="/" />}>Team Section</MenuItem>{' '}
                    </>
                )}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
        </Sidebar>
    );
};
export default SideBar;
