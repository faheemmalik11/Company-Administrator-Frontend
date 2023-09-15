import React from "react";
import { useNavigate } from "react-router-dom";
import FinanceCategoryTable from "./financeCategoryTable";

const FinanceCategories = () => {
    const navigate = useNavigate();
    
    const handleAddFinance = () => {
        navigate('/add_financeCategories')
    }

    return(
        <React.Fragment>          
            <h1>Finance Categories</h1>
            <button className="bg-sky-400" onClick={handleAddFinance}>Add new finance category</button>
            <FinanceCategoryTable />
        </React.Fragment>
    )
}

export default FinanceCategories

