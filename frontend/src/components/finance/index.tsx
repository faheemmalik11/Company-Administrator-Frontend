import React, { useEffect, useState } from "react";
import SideBar from "components/side_bar";
import { getAllFinanceData } from "services/finance";
import { dateFormat } from "utils/date";
import { Ifinance } from "app/interfaces/finance";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "UI/Modal";
import DeletePopup from "./deletePopup";

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
            <table className="border-2">
                <thead className="border-2">
                    <tr className="border-2">
                        <th>Id</th>
                        <th>Finance Category Id</th>
                        <th>Company id</th>
                        <th>Created at</th>
                        <th>Amount</th>
                        <th>Check No.</th>
                        <th>Tax deduction</th>
                        <th>Description</th>
                        <th>Updated at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        financeData.map(finance => {
                            return (
                                <tr className={((updateId == finance.id) && isHighlighted) ? `border-2 border-green-600` : 'border-2'} key={finance.id}>
                                    <td className="border-2">{finance.id}</td>
                                    <td className="border-2">{finance.finance_category_id}</td>
                                    <td className="border-2">{finance.company_id}</td>
                                    <td className="border-2">{finance.created_at}</td>
                                    <td className="border-2">{finance.amount}</td>
                                    <td className="border-2">{finance.check_number}</td>
                                    <td className="border-2">{finance.tax_deduction}</td>
                                    <td className="border-2">{finance.description}</td>
                                    <td className="border-2">{finance.updated_at}</td>
                                    <td className="border-2">
                                        <button title='update finance data' onClick={() => { updateHandler(finance.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>

                                    <td className="border-2">
                                        <button title='delete finance data' onClick={() => { deleteHandler(finance.id) }}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                                            </svg></button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Finance