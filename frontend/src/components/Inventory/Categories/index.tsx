import React, {useEffect, useState} from "react";
import CategoryTable from "./categoriesTable";
import { useNavigate, useLocation } from "react-router-dom";

const Categories = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [updateId, setUpdateId] = useState<number>();

    useEffect(() => {
        if (location.state !== null) {
            setUpdateId(location.state.cat_id);
        }
    })
    const handleAddStore = () => {
        if(location.state !== null){
            location.state=null;
        }
        navigate('/add_Category')
    }
    return(
        <React.Fragment>
            <h1>Categories Section</h1>
            <button className="bg-sky-400" onClick={handleAddStore}>Add new Category</button>
            <CategoryTable update_id={updateId}/>
        </React.Fragment>
    )
}
export default Categories