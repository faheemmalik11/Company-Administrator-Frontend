import React, {useEffect, useState} from "react";
import { dateFormat } from "utils/date";
import { useNavigate } from "react-router-dom";
import DeletePopup from "./deletePopup";
import Modal from "UI/Modal";
import { getAllStores } from "services/inventory_stores";
import { IStores } from "app/interfaces/inventory_stores";
import DataTable from "react-data-table-component";
import { customStyles } from "UI/tableStyle";

interface Props {
    update_id: number | undefined,
}

const StoreTable: React.FC<Props> = ({update_id}) => {
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState<IStores[]>([]);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [finance_id, setFinance_id] = useState<number>();
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [highlightedId, setHighlightedId] = useState<number>();
    useEffect(() => {
        const getStores = async () => {
            setDeleteDependency(false);
            const response = await getAllStores();

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
            setStoreData(response);

            // if (location.state !== null) {
            //     setUpdateId(location.state.finance_id);
            // }
        }
        getStores()
    }, [deleteDependency]);

    useEffect(() => {
        setHighlightedId(update_id)
        setIsHighlighted(true)
        setTimeout(() => {
            setIsHighlighted(false);
            setHighlightedId(0)
        }, 3000);
    }, [update_id])

    const columns = [
        {
            name: 'Id',
            cell: (row: IStores) => row.id
        },
        {
            name: 'Company id',
            cell: (row: IStores) =>row.company_id
        },
        {
            name: 'Name',
            cell: (row: IStores) => row.name
        },
        {
            name: 'Created at',
            cell: (row: IStores) => row.created_at
        },
        {
            name: 'Unique identifier',
            cell: (row: IStores) => row.unique_identifier
        },
        {
            name: 'Description',
            cell: (row: IStores) => row.description
        },
        {
            name: 'Updated at',
            cell: (row: IStores) => row.updated_at
        },
        {
            name: 'Action',
            cell: (row: IStores) => <button title='update store data' onClick={() => {updateHandler(row.id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>

        },
        {
            name: 'Delete',
            cell: (row: IStores) => <button title='delete store data' onClick={() => {deleteHandler(row.id)}}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg></button>

        }
    ]

    const deleteHandler = (id: number | undefined) => {
        setFinance_id(id);
        setIsDeletePopup(true)
    }

    const updateHandler = (id: number | undefined) => {
        navigate(`/update_Store/${id}`)
    }

    return(
        <React.Fragment>

            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsStatusPopup={setIsDeletePopup}
                    finance_id={finance_id}
                    setDeleteDependency={setDeleteDependency} />}
            </Modal>

            <DataTable columns={columns}
                data={storeData} 
                pagination
                fixedHeader={true}
                customStyles={customStyles} />

            <table className="border-2">
                <thead className="border-2">
                    <tr className="border-2">
                        <th>Id</th>
                        <th>Company Id</th>
                        <th>Name</th>
                        <th>Created at</th>
                        <th>Unique Identifier</th>
                        <th>Description</th>
                        <th>Updated at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeData.map(store => {
                            return (
                                <tr className={((highlightedId == store.id) && isHighlighted) ? `bg-sky-500/100 border-2 border-green-600 ` : 'border-2'} key={store.id}>
                                    <td className="border-2">{store.id}</td>
                                    <td className="border-2">{store.company_id}</td>
                                    <td className="border-2">{store.name}</td>
                                    <td className="border-2">{store.created_at}</td>
                                    <td className="border-2">{store.unique_identifier}</td>
                                    <td className="border-2">{store.description}</td>
                                    <td className="border-2">{store.updated_at}</td>
                                    <td className="border-2">
                                        <button title='update store data' onClick={() => {updateHandler(store.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>

                                    <td className="border-2">
                                        <button title='delete store data' onClick={() => {deleteHandler(store.id)}}>
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

export default StoreTable

