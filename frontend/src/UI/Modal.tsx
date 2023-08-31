import React from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: ()=> void;
  children: React.ReactNode

}

const Modal: React.FC<IModalProps> = ({ isOpen = false, onClose, children}) => {
  
  return (
    <div onClick={onClose} className={`fixed transition-colors ${isOpen? 'visible bg-black':'invisible'}`}>
        <div className={` border-black bg-white rounded-lg shadow p-6`} onClick={(e)=>{e.stopPropagation()}}>

            {children}
        </div>

    </div>)
};
export default Modal