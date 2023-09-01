import React from "react";
import SideBar from "components/side_bar";
import { useNavigate } from "react-router-dom";
import StoreTable from "./storeTable";

const Store = () => {
    const navigate = useNavigate()
    const handleAddStore = () => {
        navigate('/add_Store')
    }
    return(
        <React.Fragment>
            <SideBar />
            <h1>Store Section</h1>
            <button onClick={handleAddStore}>Add new Store</button>
            <StoreTable />
        </React.Fragment>
    )
}
export default Store