import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import celestialImage from 'assets/celestials-logo-300x97-1.png';
import SidebarItems from './sideBarItems';
import SidebarDropdown from './sideBarDropdown';
import BoxImage from 'assets/box.svg';
import Activity from 'assets/activity.svg';
import Cloud from 'assets/cloud.svg';
import Filter from 'assets/filter.svg';
import Target from 'assets/target.svg';
import Mail from 'assets/mail.svg';
import { logout } from 'services/auth';
import AuthContext from 'app/contexts/authContext';

interface Props {
    
    setTableName: (val: string) => void;
    
    tableName: string;
}
const SideBAR: React.FC<Props> = ({
   
    setTableName,
    tableName
}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [sideBarHover, setSideBarHover] = useState(false);
    const [isSideBarActive, setIsSideBarActive] = useState(true);
    const [sideBarHoverFinance, setSideBarHoverFinance] = useState(false);
    const [isSideBarActiveFinance, setIsSideBarActiveFinance] = useState(true);

    const toggleDropdown = () => {
        if (isSideBarActive) {
            setIsSideBarActive(false);
        }
        else {
            setIsSideBarActive(true);
        }

        if (isSideBarActive) {
            setSideBarHover(true)
        }
        else {
            setSideBarHover(false)
        }
    };
    const toggleFinanceDropdown = () => {
        if (isSideBarActiveFinance) {
            setIsSideBarActiveFinance(false);
        }
        else {
            setIsSideBarActiveFinance(true);
        }

        if (isSideBarActiveFinance) {
            setSideBarHoverFinance(true)
        }
        else {
            setSideBarHoverFinance(false)
        }

    };
    
    const logoutHandler = () => {
        logout();
        if (user.roles.includes('all')) {
            navigate('/companylogin');
        } else {
            navigate('/login');
        }
    };

    const navItemHandler = (name : string) => {
        setTableName(name);
    }

    return (
        <React.Fragment>
            <div className="bg-gray-500">
                <div
                    id="sidebar-mob"
                    className={`h-screen sm:block sm:ml-0  sideBarBackground lg:w-64 sm:w-16 w-54 overflow-auto sidebarscreen:left-0 
                         boxshadow-gray-100  font-inter fixed scrollbar-hide top-0 z-10 dark:border-r dark:border-white bg-sky-400 bg-fixed `}>
                    <div className="px-5 py-3 ">
                        <div className="w-40 pl-0.5">
                            <img
                                className="invert-[100%] sepia-[0%] saturate-[7427%] hue-rotate-[23deg] brightness-[0%] contrast-[118%] "
                                src={celestialImage}
                                alt="Logo"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between h-sideBarContentHeight px-2 pb-6">
                        <div>

                            <SidebarItems isSidebarItem={tableName}
                                sidebarItemHandler={navItemHandler}
                                itemName='Employee'
                                src={BoxImage} />

                            <SidebarItems isSidebarItem={tableName}
                                sidebarItemHandler={navItemHandler}
                                itemName='Team'
                                src={Activity} />

                            {/*-------------------------------- Inventory Section ---------------------------------------*/}
                            <SidebarDropdown
                                toggleHandler={toggleDropdown}
                                src={Cloud}
                                isHover={sideBarHover}
                                itemName='Inventory Section'
                                dropDownItems={[{ key: 1, isItem: tableName, itemHandler: setTableName, itemName: 'Item', src: Mail },
                                { key: 2, isItem: tableName, itemHandler: setTableName, itemName: 'Store', src: Target },
                                { key: 3, isItem: tableName, itemHandler: setTableName, itemName: 'Category', src: Cloud }]} />


                            {/*------------------------------- Finance Section -------------------------------*/}
                            <SidebarDropdown
                                toggleHandler={toggleFinanceDropdown}
                                src={Filter}
                                isHover={sideBarHoverFinance}
                                itemName='Finance Section'
                                dropDownItems={[{ key: 1, isItem: tableName, itemHandler: setTableName, itemName: 'Finance', src: Filter },
                                { key: 2, isItem: tableName, itemHandler: setTableName, itemName: 'Finance_Categories', src: Mail }
                                ]} />




                        </div>

                        <div style={{ position: 'absolute', bottom: 70 }}>
                            <SidebarItems isSidebarItem={'abc'}
                                sidebarItemHandler={logoutHandler}
                                itemName='Logout'
                                src={Activity} />
                        </div>

                        <div className="cursor-pointer flex justify-between items-center rounded 2xl:py-2.5 py-1.5 pr-2.5 pl-6 2xl:mt-3 mt-1 group hover:bg-primaryHover group">
                            <Link to="mailto:customers@ryzeo.com">
                                <div className="flex items-center">
                                    <img
                                        className="w-5 h-5 brightness-0 invert group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                                        src={celestialImage}
                                        alt="Help"
                                    />
                                    <span
                                        className={`lg:block sm:hidden
                                             text-15 font-medium leading-3 text-foreground dark:group-hover:text-[#495057] dark:text-[#CED4DA] pl-3 group-hover:text-white`}>
                                        Get Help
                                    </span>
                                </div>
                            </Link>

                            <Link
                                target="_blank"
                                rel="noreferrer"
                                to="https://www.youtube.com/channel/UCrg4iOGHKmXVorzCdBg-JVw"
                                className=" block hover:scale-150 ease-in-in duration-300">
                                <img
                                    className="group-hover:invert-0 dark:group-hover:invert dark:group-hover:brightness-100 h-6 w-6"
                                    src={celestialImage}
                                    alt="YouTubeIcon"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SideBAR;
