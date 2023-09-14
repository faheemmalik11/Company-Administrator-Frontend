import React, { useEffect, useState } from "react";
import SideBar from "components/side_bar";
import { getAllFinanceData } from "services/finance";
import { dateFormat } from "utils/date";
import { Ifinance } from "app/interfaces/finance";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "UI/Modal";
import DeletePopup from "./deletePopup";
import DataTable from "react-data-table-component";
import { customStyles } from "UI/tableStyle";
import { Tooltip } from "react-tooltip";

const Finance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [financeData, setFinanceData] = useState<Ifinance[]>([]);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [finance_id, setFinance_id] = useState<number>();
    const [updateId, setUpdateId] = useState<number>();
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [highlightedId, setHighlightedId] = useState<number>();
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);

    useEffect(() => {
        const getAllFinance = async () => {
            setDeleteDependency(false);
            const response = await getAllFinanceData();

            for (let i = 0; i < response.length; i++) {
                if (response[i].updated_at) {
                    const date = dateFormat(response[i].updated_at);
                    response[i].updated_at = date
                }
                if (response[i].created_at) {
                    const date = dateFormat(response[i].created_at);
                    response[i].created_at = date
                }

            }
            setFinanceData(response);

            if (location.state !== null) {
                setUpdateId(location.state.finance_id);
            }
        }
        getAllFinance()
    }, [deleteDependency]);

    useEffect(() => {
        setIsHighlighted(true)
        setHighlightedId(updateId)
        setTimeout(() => {
            setIsHighlighted(false);
            setHighlightedId(0)
        }, 3000);
    }, [updateId])

    const columns = [
        {
            name: 'Id',
            cell: (row: Ifinance) => row.id
        },
        {
            name: 'Finance category id',
            cell: (row: Ifinance) =>row.finance_category_id
        },
        {
            name: 'Company id',
            cell: (row: Ifinance) => row.company_id
        },
        {
            name: 'Created at',
            cell: (row: Ifinance) => row.created_at
        },
        {
            name: 'Amount',
            cell: (row: Ifinance) => row.amount
        },
        {
            name: 'Check No.',
            cell: (row: Ifinance) => row.check_number
        },
        {
            name: 'Tax deduction',
            cell: (row: Ifinance) => row.tax_deduction
        },
        {
            name: 'Description',
            cell: (row: Ifinance) => <button  data-tooltip-id="my-tooltip"
            data-tooltip-content={row.description} >
                <Tooltip id="my-tooltip" />
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg></button>
        },
        {
            name: 'Updated at',
            cell: (row: Ifinance) => row.updated_at
        },
        {
            name: 'Action',
            cell: (row: Ifinance) => <button title='update finance data' onClick={() => { updateHandler(row.id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>

        },
        {
            name: 'Delete',
            cell: (row: Ifinance) => <button title='delete finance data' onClick={() => { deleteHandler(row.id) }}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg></button>

        }
    ]

  //  console.log(updateId)
    const handleAddFinance = () => {
        navigate('/add_Finance')
    }
    const deleteHandler = (id: number | undefined) => {
        setFinance_id(id);
        setIsDeletePopup(true)
    }
    const updateHandler = (id: number | undefined) => {
        navigate(`/update_Finance/${id}`)
    }
    return (
        <React.Fragment>
            {/* <SideBar /> */}
            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsStatusPopup={setIsDeletePopup}
                    finance_id={finance_id}
                    setDeleteDependency={setDeleteDependency} />}
            </Modal>
            <h1>Finance Section</h1>
            <button onClick={handleAddFinance}>Add new finance data</button>

            <DataTable columns={columns}
                data={financeData} 
                pagination
                fixedHeader
                fixedHeaderScrollHeight='550px'
                customStyles={customStyles} />

{/* <tr className={((updateId == finance.id) && isHighlighted) ? `border-2 border-green-600` : 'border-2'} key={finance.id}></tr> */}

            
        </React.Fragment>
    )
}

export default Finance