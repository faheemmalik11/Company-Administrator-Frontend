import React, {useEffect, useState} from "react";
import { dateFormat } from "utils/date";
import { useNavigate, useLocation } from "react-router-dom";
import DeletePopup from "./deletePopup";
import Modal from "UI/Modal";
import { Icategories } from "app/interfaces/inventory_categories";
import { getAllCategories } from "services/inventory_categories";

interface Props {
    update_id: number | undefined,
}

const CategoryTable: React.FC<Props> = ({ update_id }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [categoryData, setCategoryData] = useState<Icategories[]>([]);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [finance_id, setFinance_id] = useState<number>();
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [highlightedId, setHighlightedId] = useState<number>();
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);
    
    useEffect(() => {
        
        const getItems = async () => {
            //setHighlightedId(update_id)
            setDeleteDependency(false);
            const response = await getAllCategories();

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
            setCategoryData(response);

            // if (location.state !== null) {
            //     setUpdateId(location.state.finance_id);
            // }
        }
        getItems()
    }, [deleteDependency]);

    useEffect(() => {
        setHighlightedId(update_id)
        setIsHighlighted(true)
        setTimeout(() => {
            setIsHighlighted(false);
            setHighlightedId(0)
        }, 3000);
    }, [update_id])

    const deleteHandler = (id: number | undefined) => {
        setFinance_id(id);
        setIsDeletePopup(true)
    }

    const updateHandler = (id: number | undefined) => {
        navigate(`/update_Category/${id}`)
    }

    return(
        <React.Fragment>

            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsStatusPopup={setIsDeletePopup}
                    finance_id={finance_id}
                    setDeleteDependency={setDeleteDependency} />}
            </Modal>
            <table className="border-2">
                <thead className="border-2">
                    <tr className="border-2">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created at</th>
                        <th>Company Id</th>
                        <th>Updated at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoryData.map(category => {
                            return (
                                <tr className={((highlightedId == category.id) && isHighlighted) ? `bg-sky-500/100 border-2 border-green-600 ` : 'border-2'} key={category.id}>
                                    <td className="border-2">{category.id}</td>
                                    <td className="border-2">{category.name}</td>
                                    <td className="border-2">{category.description}</td>
                                    <td className="border-2">{category.created_at}</td>
                                    <td className="border-2">{category.company_id}</td>
                                    <td className="border-2">{category.updated_at}</td>
                                    <td className="border-2">
                                        <button title='update store data' onClick={() => {updateHandler(category.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>

                                    <td className="border-2">
                                        <button title='delete store data' onClick={() => {deleteHandler(category.id)}}>
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

export default CategoryTable

