import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import celestialImage from 'assets/celestials-logo-300x97-1.png';
import SidebarItems from './sideBarItems';
import SidebarDropdown from './sideBarDropdown';
import BoxImage from 'assets/box.svg';
import Activity from 'assets/activity.svg';
import Cloud from 'assets/cloud.svg';
import Filter from 'assets/filter.svg';
import Target from 'assets/target.svg';
import Mail from 'assets/mail.svg';

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
    isTeam: boolean;
}
const SideBAR: React.FC<Props> = ({
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
    isTeam,
}) => {
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
    const employeeHandler = () => {
        setIsEmployee(true);
        setIsFinance(false);
        setIsFinanceCategories(false);
        setIsCategory(false);
        setIsItem(false);
        setIsStore(false);
        setIsTeam(false);
    };
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
        <React.Fragment>
            <div className="bg-gray-500">
                {/* {showSidebar && (
                    <div
                        className="fixed top-0 w-full h-full z-10 bg-black-200 duration-300"
                        onClick={toggleSidebar}
                    />
                )} */}
                {/* {(
                    <div

                        className='left-[240px] rotate-180
                             fixed rounded-full flex items-center   w-8 h-8 z-20 top-12 bodyShadow cursor-pointer sideBarBackground'
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mx-auto w-6 h-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                )} */}
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
                        {/* // :
                            // <img
                            //     className="invert-[100%] sepia-[0%] saturate-[7427%] hue-rotate-[23deg] brightness-[0%] contrast-[118%] "
                            //     src={LogoInitial}
                            //     alt="Logo"
                            // /> */}
                    </div>

                    <div className="bg-sky-400 flex flex-col justify-between h-sideBarContentHeight px-2 pb-6">
                        <div>

                            <SidebarItems isSidebarItem={isEmployee}
                                sidebarItemHandler={employeeHandler}
                                itemName='Employee'
                                src={BoxImage} />

                            <SidebarItems isSidebarItem={isTeam}
                                sidebarItemHandler={teamHandler}
                                itemName='Team'
                                src={Activity} />

                            {/*-------------------------------- Inventory Section ---------------------------------------*/}
                            <SidebarDropdown
                                toggleHandler={toggleDropdown}
                                src={Cloud}
                                isHover={sideBarHover}
                                itemName='Inventory Section'
                                dropDownItems={[{ key:1, isItem: isItem, itemHandler: itemHandler, itemName: 'Item',src:Mail },
                                {key:2, isItem: isStore, itemHandler: storeHandler, itemName: 'Store',src:Target },
                                {key:3,  isItem: isCategory, itemHandler: categoryHandler, itemName: 'Category', src:Cloud }]} />


                            {/*------------------------------- Finance Section -------------------------------*/}
                            <SidebarDropdown
                                toggleHandler={toggleFinanceDropdown}
                                src={Filter}
                                isHover={sideBarHoverFinance}
                                itemName='Finance Section'
                                dropDownItems={[{key:1 , isItem: isFinance, itemHandler: financeHandler, itemName: 'Finance',src:Filter },
                                {key:2, isItem: isFinanceCategories, itemHandler: financeCategoryHandler, itemName: 'Finance Categories',src:Mail }
                                ]} />




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
