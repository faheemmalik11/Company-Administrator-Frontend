import React, {useEffect, useState} from "react";
import SideBar from "components/side_bar";
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
        navigate('/add_Category')
    }
    return(
        <React.Fragment>
            <SideBar />
            <h1>Categories Section</h1>
            <button onClick={handleAddStore}>Add new Store</button>
            <CategoryTable update_id={updateId}/>
        </React.Fragment>
    )
}
export default Categories