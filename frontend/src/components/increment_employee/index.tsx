import React from "react"
import IncrementEmployeeTable from "./incrementEmployeeTable"
import { useNavigate } from "react-router"


const IncrementHistory = () => {
    const navigate = useNavigate()
    
    return (
        <React.Fragment>
            <button title="back to dashboard" onClick={() => { navigate('/dashboard') }}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg></button>
            <h1>Increment History Table</h1>
            <IncrementEmployeeTable />
            
        </React.Fragment>
    )
}
export default IncrementHistory