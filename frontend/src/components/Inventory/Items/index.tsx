import React, {useEffect, useState} from "react";
import SideBar from "components/side_bar";
import ItemTable from "./itemsTable";
import { useNavigate, useLocation } from "react-router-dom";

const Items = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useState<number>();

    useEffect(() => {
        if (location.state !== null) {
            setUpdateId(location.state.item_id);
        }
    })

    const handleAddStore = () => {
        if(location.state !== null){
            location.state=null;
        }
        navigate('/add_Item')
    }
    return(
        <React.Fragment>
            {/* <SideBar /> */}
            <h1>Items Section</h1>
            <button onClick={handleAddStore}>Add new Store</button>
            <ItemTable update_id={updateId}/>
        </React.Fragment>
    )
}

export default Items