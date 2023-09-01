import React from "react";
import SideBar from "components/side_bar";
import ItemTable from "./itemsTable";
import { useNavigate } from "react-router-dom";

const Items = () => {
    const navigate = useNavigate()
    const handleAddStore = () => {
        navigate('/add_Item')
    }
    return(
        <React.Fragment>
            <SideBar />
            <h1>Items Section</h1>
            <button onClick={handleAddStore}>Add new Store</button>
            <ItemTable />
        </React.Fragment>
    )
}

export default Items