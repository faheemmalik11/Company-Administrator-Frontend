import React, {useEffect, useState} from "react";
import SideBar from "components/side_bar";
import { useNavigate, useLocation } from "react-router-dom";
import StoreTable from "./storeTable";

const Store = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useState<number>();

    useEffect(() => {
        if (location.state !== null) {
            setUpdateId(location.state.store_id);
        }
    })

    const handleAddStore = () => {
        if(location.state !== null){
            location.state=null;
        }
        navigate('/add_Store')
    }
    return(
        <React.Fragment>
            {/* <SideBar /> */}
            <h1>Store Section</h1>
            <button className="bg-sky-400" onClick={handleAddStore}>Add new Store</button>
            <StoreTable update_id={updateId}/>
        </React.Fragment>
    )
}
export default Store