import React from "react";

interface dropDown {
    key: number;
    isItem: boolean;
    itemHandler: () => void;
    itemName: string;
    src: string
}
interface Props {
    itemName: string;
    toggleHandler: () => void;
    isHover: boolean;
    dropDownItems: dropDown[];
    src: string;
}
const SidebarDropdown: React.FC<Props> = ({ isHover, toggleHandler, src, itemName, dropDownItems }) => {
    return (
        <React.Fragment>
            <div className='relative' >
                <h2
                    className="2xl:mt-3 mt-1 w-full flex justify-between items-center relative z-[9999]"
                >
                    <div
                        onClick={() => toggleHandler()}
                        // onMouseEnter={() => { toggleDropdown() }}
                        className={`w-full flex justify-between items-center rounded 2xl:py-2.5 py-1.5 pl-6 pr-2.5 group hover:bg-primaryHover dark:hover:bg-white group cursor-pointer`}
                    >
                        <div className="flex items-center " >
                            <span>
                                <img
                                    className={`brightness-0 invert w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-1 dark:group-hover:brightness-100`}
                                    src={src}
                                    alt="Box"
                                />
                            </span>
                            <span
                                className={`text-foreground dark:text-white lg:block sm:hidden 
                   text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-black-400 pl-3 sidebar-links group-hover:text-white`}
                            >
                                {itemName}
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
                </h2>


                <div className='sideBarOpen'>
                    {isHover &&
                        <ul>
                            {
                                dropDownItems.map((item) => (
                                    <li key={item.key}>
                                        <h2
                                            //  to={''}
                                            // target={sidebarItem.text === 'Pop-Ups' ? '_blank' : '_self'}
                                            // className='bg-gray-500'
                                            onClick={item.itemHandler}>
                                            <div
                                                className={`${item.isItem ? 'bg-primaryHover ' : ''
                                                    } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                                                <div className="flex items-center">
                                                    <span>
                                                        <img
                                                            className={
                                                                'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                                            }
                                                            src={item.src}
                                                            alt="Box"
                                                        />
                                                    </span>
                                                    <span
                                                        className={`${item.isItem ? 'text-white ' : ' text-foreground dark:text-white '
                                                            } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                                                        {item.itemName}
                                                    </span>
                                                </div>
                                            </div>
                                        </h2>
                                    </li>))
                            }
                            
                        </ul>}
                </div>


            </div>
        </React.Fragment>
    )
}

export default SidebarDropdown