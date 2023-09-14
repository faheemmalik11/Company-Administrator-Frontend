import React, {useState, useRef, useContext} from "react";
import AuthContext from 'app/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Cloud from 'assets/cloud.svg';
import Filter from 'assets/filter.svg';
import { logout } from 'services/auth';
import { useOutsideClick } from "hooks/useOutsideClick";

const NavBAR = () => {
    const navigate = useNavigate();
    const [profileDropdown, setProfileDropdown] = useState(false);
    const outsideRef = useRef(null);
    const { user } = useContext(AuthContext);

    useOutsideClick(outsideRef, () => {
        setProfileDropdown(false);
      });
      
    const getNameInitials = (name: string | undefined) => {
        const initials = name && name.slice(0, 2).toUpperCase();
        return initials || '';
      };

    const updateProfileHandler = () => {
        navigate('/update_setting');
    };

    return(<div>
        <header className="border-b bg-slate-400 md:px-6 px-4 dark:bg-transparent flex items-center h-[70px] border-[#E9EBEC] dark:border-[#fff]">
          <div
            ref={outsideRef}
            className="flex justify-between items-center w-full"
          >
            <div className="sm:hidden mr-4 h-5">
              
            </div>
            <div></div>
            
            <div className="flex items-center py-2 pl-4 dark:border-[#fff]">
              
              
              <div className=" relative ">
                <div
                  onClick={() => setProfileDropdown((prev) => !prev)}
                  className="flex items-center justify-center h-[70px] sm:w-[150px]  cursor-pointer"
                >
                  <div className="sm:w-[36px] sm:h-[36px] w-[30px] h-[30px] rounded-full sideBarBackground flex justify-center items-center">
                    {/* <img
                      src="https://themesbrand.com/velzon/html/galaxy/assets/images/users/avatar-1.jpg"
                      className="rounded-full"
                      alt="dp"
                    /> */}
                    <p className="text-white font-medium ">
                      {getNameInitials(user.name)}
                        
                    </p>
                  </div>
                  <span className="ml-2 flex flex-col">
                    {/* <span className="font-semibold text-[13px] text-[#495057] dark:text-[#CED4DA]">
                      {user?.name}
                    </span> */}
                  </span>
                </div>
                {profileDropdown && (
                  <div className="absolute w-full z-[9999] rounded shadow-md  bg-white">
                    <p className="text-xs text-[#495057] px-4 py-2">
                      Welcome{' '}
                      {user?.name}
                      !
                    </p>
                    
                    <button
                      onClick={updateProfileHandler}
                      type='button'
                      className="flex items-center px-4 h-9 hover:bg-[#F3F6F9] w-full"
                    >
                      <img className="w-4 h-6 mr-1.5" src={Filter} />
                      <p className="text-[#212529] text-sm">Edit Profile</p>
                    </button>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>)
} 
export default NavBAR