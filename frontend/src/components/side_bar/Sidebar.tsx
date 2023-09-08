import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import celestialImage from 'assets/celestials-logo-300x97-1.png';
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
    const [isSideBarActive, setIsSideBarActive] = useState(false);
    const [sideBarHoverFinance, setSideBarHoverFinance] = useState(false);
    const [isSideBarActiveFinance, setIsSideBarActiveFinance] = useState(false);
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

        //   }
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

        //   }
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
                         boxshadow-gray-100  font-inter fixed scrollbar-hide top-0 z-10 dark:border-r dark:border-white bg-[url('assets/sideBarBg.png')] bg-fixed `}>
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

                    <div className="bg-red-600 flex flex-col justify-between h-sideBarContentHeight px-2 pb-6">
                        <div>
                            <button
                                //  to={''}
                                // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                className='bg-gray-500'
                                onClick={employeeHandler}>
                                <div
                                    className={`${isEmployee ? 'bg-primaryHover ' : ''
                                        } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                    <div className="flex items-center">
                                        <span>
                                            <img
                                                className={
                                                    'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                }
                                                src={''}
                                                alt="Box"
                                            />
                                        </span>
                                        <span
                                            className={`${isEmployee ? 'text-white ' : ' text-foreground dark:text-white '
                                                } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                            {'Employee'}
                                        </span>
                                    </div>
                                </div>
                            </button>
                            <button
                                //  to={''}
                                // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                className='bg-gray-500'
                                onClick={teamHandler}>
                                <div
                                    className={`${isEmployee ? 'bg-primaryHover ' : ''
                                        } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                    <div className="flex items-center">
                                        <span>
                                            <img
                                                className={
                                                    'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                }
                                                src={''}
                                                alt="Box"
                                            />
                                        </span>
                                        <span
                                            className={`${isTeam ? 'text-white ' : ' text-foreground dark:text-white '
                                                } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                            {'Team'}
                                        </span>
                                    </div>
                                </div>
                            </button>

                 {/*-------------------------------- Inventory Section ---------------------------------------*/}

                            <div className='relative' >
                                <button
                                    className="2xl:mt-3 mt-1 w-full flex justify-between items-center relative z-[9999]"
                                >
                                    <div
                                        onClick={() => toggleDropdown()}
                                        // onMouseEnter={() => { toggleDropdown() }}
                                        className={`w-full flex justify-between items-center rounded 2xl:py-2.5 py-1.5 pl-6 pr-2.5 group hover:bg-primaryHover dark:hover:bg-white group cursor-pointer`}
                                    >
                                        <div className="flex items-center " >
                                            <span>
                                                <img
                                                    className={`brightness-0 invert w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-1 dark:group-hover:brightness-100`}
                                                    src={''}
                                                    alt="Box"
                                                />
                                            </span>
                                            <span
                                                className={`text-foreground dark:text-white lg:block sm:hidden 
                   text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-black-400 pl-3 sidebar-links group-hover:text-white`}
                                            >
                                                {'Inventory Section'}
                                            </span>
                                        </div>

                                        <p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`lg:block sm:hidden
                   w-4 h-4 text-foreground dark:group-hover:brightness-0 indent-1`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </p>

                                    </div>
                                </button>


                                <div className='sideBarOpen'>
                                    {sideBarHover &&
                                        <ul>
                                            <li>
                                                <button
                                                    //  to={''}
                                                    // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                                    className='bg-gray-500'
                                                    onClick={itemHandler}>
                                                    <div
                                                        className={`${isItem ? 'bg-primaryHover ' : ''
                                                            } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                        <div className="flex items-center">
                                                            <span>
                                                                <img
                                                                    className={
                                                                        'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                                    }
                                                                    src={''}
                                                                    alt="Box"
                                                                />
                                                            </span>
                                                            <span
                                                                className={`${isItem ? 'text-white ' : ' text-foreground dark:text-white '
                                                                    } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                                {'Team'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    //  to={''}
                                                    // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                                    className='bg-gray-500'
                                                    onClick={storeHandler}>
                                                    <div
                                                        className={`${isStore ? 'bg-primaryHover ' : ''
                                                            } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                        <div className="flex items-center">
                                                            <span>
                                                                <img
                                                                    className={
                                                                        'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                                    }
                                                                    src={''}
                                                                    alt="Box"
                                                                />
                                                            </span>
                                                            <span
                                                                className={`${isStore ? 'text-white ' : ' text-foreground dark:text-white '
                                                                    } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                                {'Store'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    //  to={''}
                                                    // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                                    className='bg-gray-500'
                                                    onClick={categoryHandler}>
                                                    <div
                                                        className={`${isCategory ? 'bg-primaryHover ' : ''
                                                            } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                        <div className="flex items-center">
                                                            <span>
                                                                <img
                                                                    className={
                                                                        'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                                    }
                                                                    src={''}
                                                                    alt="Box"
                                                                />
                                                            </span>
                                                            <span
                                                                className={`${isCategory ? 'text-white ' : ' text-foreground dark:text-white '
                                                                    } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                                {'Category'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                        </ul>}






                                    
                                </div>


                            </div>

              {/*------------------------------- Finance Section -------------------------------*/}


                            <div className='relative' >
                                <button
                                    className="2xl:mt-3 mt-1 w-full flex justify-between items-center relative z-[9999]"
                                >
                                    <div
                                        onClick={() => toggleFinanceDropdown()}
                                        // onMouseEnter={() => { toggleDropdown() }}
                                        className={`w-full flex justify-between items-center rounded 2xl:py-2.5 py-1.5 pl-6 pr-2.5 group hover:bg-primaryHover dark:hover:bg-white group cursor-pointer`}
                                    >
                                        <div className="flex items-center " >
                                            <span>
                                                <img
                                                    className={`brightness-0 invert w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-1 dark:group-hover:brightness-100`}
                                                    src={''}
                                                    alt="Box"
                                                />
                                            </span>
                                            <span
                                                className={`text-foreground dark:text-white lg:block sm:hidden 
                   text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-black-400 pl-3 sidebar-links group-hover:text-white`}
                                            >
                                                {'Finance Section'}
                                            </span>
                                        </div>

                                        <p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`lg:block sm:hidden
                   w-4 h-4 text-foreground dark:group-hover:brightness-0 indent-1`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </p>

                                    </div>
                                </button>


                                <div className='sideBarOpen'>
                                    {sideBarHoverFinance &&
                                        <ul>
                                            <li>
                                                <button
                                                    //  to={''}
                                                    // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                                    className='bg-gray-500'
                                                    onClick={financeHandler}>
                                                    <div
                                                        className={`${isFinance ? 'bg-primaryHover ' : ''
                                                            } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                        <div className="flex items-center">
                                                            <span>
                                                                <img
                                                                    className={
                                                                        'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                                    }
                                                                    src={''}
                                                                    alt="Box"
                                                                />
                                                            </span>
                                                            <span
                                                                className={`${isFinance ? 'text-white ' : ' text-foreground dark:text-white '
                                                                    } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                                {'Finance'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    //  to={''}
                                                    // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                                    className='bg-gray-500'
                                                    onClick={financeCategoryHandler}>
                                                    <div
                                                        className={`${isFinanceCategories ? 'bg-primaryHover ' : ''
                                                            } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                        <div className="flex items-center">
                                                            <span>
                                                                <img
                                                                    className={
                                                                        'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                                    }
                                                                    src={''}
                                                                    alt="Box"
                                                                />
                                                            </span>
                                                            <span
                                                                className={`${isFinanceCategories ? 'text-white ' : ' text-foreground dark:text-white '
                                                                    } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                                {'Finance Categories'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                                
                                        </ul>}






                                    
                                </div>


                            </div>




                            {/* {SideBarData.map((sidebar) => (
                                <SidebarItem
                                    key={sidebar.id}
                                    sidebarItem={sidebar}
                                    showFullSidebar={showFullSidebar}
                                    setDropdownMenu={setDropdownMenu}
                                    dropdownMenu={dropdownMenu}
                                />
                            ))} */}
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
