import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import FinanceTable from "./financeTable";

const Finance = () => {
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useState<number>();
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [highlightedId, setHighlightedId] = useState<number>();

    useEffect(() => {
        setIsHighlighted(true)
        setHighlightedId(updateId)
        setTimeout(() => {
            setIsHighlighted(false);
            setHighlightedId(0)
        }, 3000);
    }, [updateId])

   

  //  console.log(updateId)
    const handleAddFinance = () => {
        navigate('/add_Finance')
    }
    
    return (
        <React.Fragment>
            
            <h1>Finance Section</h1>
            <button className="bg-sky-400" onClick={handleAddFinance}>Add new finance data</button>

            <FinanceTable />

            
        </React.Fragment>
    )
}

export default Finance