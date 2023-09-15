import React, { useState, useEffect } from "react";
import { getTeamDatabyId } from "services/team";
import { useParams } from "react-router-dom";
import Modal from "UI/Modal";
import AddMemberPopup from "UI/addMemberPopup";
import DeletePopup from "UI/deletePopup";
import DataTable from "react-data-table-component";
import { customStyles } from "UI/tableStyle";
import {  deleteTeamMember } from "services/team";

interface Props {
    team_lead_id: number | undefined,
}

interface IteamMmber {
    id: number;
    name: string;
    cnic: string;
    email: string;
}

const TeamMembersTable: React.FC<Props> = ({ team_lead_id }) => {
    const { team_id } = useParams();
    const [teamData, setTeamData] = useState<IteamMmber[]>([]);
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);
    const [addMemberDependency, setAddMemberDependency] = useState<boolean>(false);
    const [isAddMemberPopup, setIsAddMemberPopup] = useState<boolean>(false);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);

    const [empId, setEmpId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const getAllTeamMembers = async () => {
            setDeleteDependency(false);
            const response = await getTeamDatabyId(team_id);

            setTeamData(response.employees);

        }
        getAllTeamMembers()
    }, [deleteDependency, addMemberDependency]);

    const columns = [
        {
            name: 'Id',
            cell: (row: IteamMmber) => row.id
        },
        {
            name: 'Name',
            cell: (row: IteamMmber) =><div title={((team_lead_id == row.id)) ? `team lead` : ''}
            className={((team_lead_id == row.id)) ? `bg-green-500/100 border-2 border-green-600 ` : 'border-2'}>
            {row.name} </div>
        },
        {
            name: 'Email',
            cell: (row: IteamMmber) => row.email
        },
        {
            name: 'Cnic',
            cell: (row: IteamMmber) => row.cnic
        },
        {
            name: 'Action',
            cell: (row: IteamMmber) => <button className={((team_lead_id == row.id)) ? `invisible ...` : ''} title='delete store data' onClick={() => { deleteHandler(row.id) }}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg></button>

        }
    ]

    const deleteHandler = (id: number) => {
        setEmpId(id);
        setIsDeletePopup(true)
    }

    const handleAddTeamMember = () => {
        setIsAddMemberPopup(true);
    }
    const deleteHandlerInPopup = async (id: number | undefined,val2: number | undefined ,team_id: string | undefined) => {
        setIsLoading(false);
        const response = await deleteTeamMember({team_id: team_id, employee_id: id})
        if (response.code === 200) {
            setIsDeletePopup(false);
            setDeleteDependency(true);
        }
        else {

        }
    }

    return (
        <React.Fragment>
            <Modal isOpen={isAddMemberPopup} onClose={() => { setIsAddMemberPopup(false) }}>
                {isAddMemberPopup && <AddMemberPopup
                    setIsStatusPopup={setIsAddMemberPopup}
                    team_id={team_id}
                    setAddMemberDependency={setAddMemberDependency} />}
            </Modal>

            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsDeletePopup={setIsDeletePopup}
                    isLoading={isLoading}
                    team_id={team_id}
                    //emp_id={empId}
                    id={empId}
                    deleteHandlerInPopup={deleteHandlerInPopup} />}
            </Modal>
            <button className="bg-sky-400" onClick={handleAddTeamMember}>Add new Member</button>

            <DataTable columns={columns}
                data={teamData} 
                pagination
                fixedHeader
                fixedHeaderScrollHeight='550px'
                customStyles={customStyles} />

        </React.Fragment>
    )
}

export default TeamMembersTable