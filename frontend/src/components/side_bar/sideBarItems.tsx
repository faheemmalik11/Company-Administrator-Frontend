import React from "react"
interface Props {
    isSidebarItem: string;
    sidebarItemHandler: (val:string) => void;
    itemName: string;
    src: string;
}
const SidebarItems: React.FC<Props> = ({ isSidebarItem, sidebarItemHandler, itemName, src }) => {
    return (
        <React.Fragment>
            <h2
                onClick={()=>{sidebarItemHandler(itemName)}}>
                <div
                    className={`${isSidebarItem===itemName ? 'bg-primaryHover ' : ''
                        } flex justify-between items-center rounded 2xl:py-2.5 py-1 pl-6 pr-2.5 mt-3 group hover:bg-primaryHover group cursor-pointer`}>
                    <div className="flex items-center">
                        <span>
                            <img
                                className={
                                    'brightness-0 invert  w-5 h-5 group-hover:invert group-hover:brightness-0 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100'
                                }
                                src={src}
                                alt="Box"
                            />
                        </span>
                        <span
                            className={`${isSidebarItem===itemName ? 'text-white ' : ' text-foreground dark:text-white '
                                } lg:block
                                                 text-15 font-medium leading-3 dark:text-[#A4AAC7] dark:group-hover:text-[#495057] dark:text-[#CED4DA]  pl-3 sidebar-links group-hover:text-white`}>
                            {itemName}
                        </span>
                    </div>
                </div>
            </h2>
        </React.Fragment>
    )
}

export default SidebarItems