import React, { useEffect, useState } from "react"
import { deleteIncrementHistoryById, getIncrementHistoryById } from "services/incrementEmployee"
import { useParams } from "react-router"
import { IincrementHistory } from "app/interfaces/incrementHistory"
import { dateFormat } from "utils/date"
import { useNavigate } from "react-router"
import Modal from "UI/Modal"
import DeletePopup from "./deletePopup"
import DataTable from "react-data-table-component"
import { customStyles } from "UI/tableStyle"
import { Tooltip } from "react-tooltip"

const IncrementHistory = () => {
    const navigate = useNavigate()
    const { Id } = useParams();
    const [incrementData, setIncrementData] = useState<IincrementHistory[]>([]);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [increment_id, setIncrementId] = useState<number>();
    const [employee_id, setEmployee_id] = useState<number>();
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);

    useEffect(() => {
        const getHistory = async () => {
            setDeleteDependency(false);

            const response = await getIncrementHistoryById(Id);

            for (let i = 0; i < response.length; i++) {
                if (response[i].updated_at) {
                    const date = dateFormat(response[i].updated_at);
                    response[i].updated_at = date
                }
                if (response[i].increment_effective_date) {
                    const date = dateFormat(response[i].increment_effective_date);
                    response[i].increment_effective_date = date
                }
                if (response[i].created_at) {
                    const date = dateFormat(response[i].created_at);
                    response[i].created_at = date
                }

            }
            setIncrementData(response)
        }
        getHistory()

    }, [deleteDependency])

    const columns = [
        {
            name: 'Created at',
            cell: (row: IincrementHistory) => row.created_at
        },
        {
            name: 'Id',
            cell: (row: IincrementHistory) => row.id
        },
        {
            name: 'Employee id',
            cell: (row: IincrementHistory) => row.employee_id
        },
        {
            name: 'Increment Amount',
            cell: (row: IincrementHistory) => row.increment_amount
        },
        {
            name: 'Increment effective date',
            cell: (row: IincrementHistory) => row.increment_effective_date
        },
        {
            name: 'Notes',
            cell: (row: IincrementHistory) => <button  data-tooltip-id="my-tooltip"
            data-tooltip-content={row.notes} >
                <Tooltip id="my-tooltip" />
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg></button>
        },
        {
            name: 'Updated at',
            cell: (row: IincrementHistory) => row.updated_at
        },
        {
            name: 'Action',
            cell: (row: IincrementHistory) => <button title='update increment' onClick={() => { updateIncrementHandler(row.id) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>

        },
        {
            name: 'Delete',
            cell: (row: IincrementHistory) => <button title='delete increment' onClick={() => { deleteIncrementHandler(row.id, row.employee_id) }}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                </svg></button>

        }
    ]
    const deleteIncrementHandler = (id: number, emp_id: number) => {
        setIncrementId(id);
        setEmployee_id(emp_id)
        setIsDeletePopup(true)
    }
    const updateIncrementHandler = (inc_id: number) => {
        navigate(`/updateIncrementHistory_employee/${inc_id}`, { state: { Emp_id: Id } })
    }
    return (
        <React.Fragment>
            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsStatusPopup={setIsDeletePopup}
                    id={increment_id}
                    emp_id={employee_id}
                    setDeleteDependency={setDeleteDependency} />}
            </Modal>
            <button title="back to dashboard" onClick={() => { navigate('/dashboard') }}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg></button>
            <h1>Increment History Table</h1>

            <DataTable columns={columns}
                data={incrementData} pagination
                fixedHeader
                fixedHeaderScrollHeight='550px'
                customStyles={customStyles} />


            
        </React.Fragment>
    )
}
export default IncrementHistory