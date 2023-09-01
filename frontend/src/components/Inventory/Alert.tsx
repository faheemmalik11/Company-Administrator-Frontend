import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

interface Props {
    responseMessage: string,
    setIsAlert: (val:boolean)=> void;
    showFinanceLink: boolean
    setShowFinanceLink: (val:boolean)=> void;
    linkValue: string
    
}
const Alert:React.FC<Props> = ({responseMessage, setIsAlert, showFinanceLink, setShowFinanceLink, linkValue}) => {
    const [color, setColor] = useState<string>('green');
    useEffect(()=>{
        console.log('show color', showFinanceLink)
        if(showFinanceLink === true){
            setColor('green')
        }
        else{
            setColor('red')
        }
    },[])
    console.log('show color', color)
    const handleSuccessAlert = () => {
        setIsAlert(false);
        setShowFinanceLink(false);
        
    }
    return(
    <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`} role="alert">
   <strong className="font-bold">{showFinanceLink && <Link to={`/${linkValue}`}>{linkValue}</Link>}</strong>
  <span className="block sm:inline">{responseMessage}      .</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleSuccessAlert}>
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
    )
}
export default Alert