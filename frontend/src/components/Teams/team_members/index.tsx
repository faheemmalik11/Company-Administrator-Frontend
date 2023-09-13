import { ITeam } from "app/interfaces/team";
import React, {useEffect, useState} from "react";
import { getAllTeamsData } from "services/team";
import { dateFormat } from "utils/date";
import { useLocation, useNavigate } from "react-router-dom";
import TeamMembersTable from "./teamMemberTable";
import SideBar from "components/side_bar";

const TeamMembers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [team_lead_id, setTeam_lead_id] = useState<number>();

    useEffect(() => {
        if (location.state !== null) {
            setTeam_lead_id(location.state.team_lead_id);
        }
    })

    return(
        <React.Fragment>
            {/* <SideBar /> */}
            <button title="back to dashboard" onClick={() => { navigate('/team') }}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg></button>
            <h1>Team Members</h1>
            <TeamMembersTable team_lead_id={team_lead_id}/>
        </React.Fragment>
    )
}

export default TeamMembers