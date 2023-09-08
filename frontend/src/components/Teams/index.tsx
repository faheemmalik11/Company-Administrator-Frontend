import { ITeam } from "app/interfaces/team";
import React, {useEffect, useState} from "react";
import { getAllTeamsData } from "services/team";
import { dateFormat } from "utils/date";
import { useLocation, useNavigate } from "react-router-dom";
import TeamTable from "./teamTable";
import SideBar from "components/side_bar";

const Teams = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useState<number>();

    useEffect(() => {
        if (location.state !== null) {
            setUpdateId(location.state.team_id);
        }
    })

    const handleAddTeam = () => {
        if(location.state !== null){
            location.state=null;
        }
        navigate('/add_team')
    }
    return(
        <React.Fragment>
            {/* <SideBar /> */}
            <h1>Team Section</h1>
            <button onClick={handleAddTeam}>Add new Team</button>
            <TeamTable update_id={updateId}/>
        </React.Fragment>
    )
}

export default Teams