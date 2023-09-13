import { ITeam } from "app/interfaces/team";
import React, { useState, useEffect } from "react";
import { getAllTeamsData, getTeamDatabyId } from "services/team";
import { useParams } from "react-router-dom";
import { IEmployee } from "app/interfaces/employee";
import Modal from "UI/Modal";
import AddMemberPopup from "./addMemberPopup";
import DeletePopup from "./deletePopup";
import DataTable from "react-data-table-component";
import { customStyles } from "UI/tableStyle";

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
    const [isStatusPopup, setIsStatusPopup] = useState<boolean>(false);
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [empId, setEmpId] = useState<number>(0);

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
            selector: (row: any) => row.id
        },
        {
            name: 'Name',
            selector: (row: any) =><div title={((team_lead_id == row.id)) ? `team lead` : ''}
            className={((team_lead_id == row.id)) ? `bg-green-500/100 border-2 border-green-600 ` : 'border-2'}>
            {row.name} </div>
        },
        {
            name: 'Email',
            selector: (row: IteamMmber) => row.email
        },
        {
            name: 'Cnic',
            selector: (row: IteamMmber) => row.cnic
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
        setIsStatusPopup(true);
    }

    return (
        <React.Fragment>
            <Modal isOpen={isStatusPopup} onClose={() => { setIsStatusPopup(false) }}>
                {isStatusPopup && <AddMemberPopup
                    setIsStatusPopup={setIsStatusPopup}
                    team_id={team_id}
                    setAddMemberDependency={setAddMemberDependency} />}
            </Modal>

            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsStatusPopup={setIsDeletePopup}
                    emp_id={empId}
                    team_id={team_id}
                    setDeleteDependency={setDeleteDependency} />}
            </Modal>
            <button onClick={handleAddTeamMember}>Add new Member</button>

            <DataTable columns={columns}
                data={teamData} 
                pagination
                fixedHeader={true}
                customStyles={customStyles} />


            {/* <table className="border-2">
                <thead className="border-2">
                    <tr className="border-2">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Cnic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teamData.map(team => {
                            return (
                                <tr key={team.id}>
                                    <td className="border-2">{team.id}</td>
                                    <td title={((team_lead_id == team.id)) ? `team lead` : ''}
                                        className={((team_lead_id == team.id)) ? `bg-green-500/100 border-2 border-green-600 ` : 'border-2'}>
                                        {team.name}
                                    </td>
                                    <td className="border-2">{team.email}</td>
                                    <td className="border-2">{team.cnic}</td>

                                    <td className="border-2">
                                        <button className={((team_lead_id == team.id)) ? `invisible ...` : ''} title='delete store data' onClick={() => { deleteHandler(team.id) }}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                                            </svg></button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table> */}
        </React.Fragment>
    )
}

export default TeamMembersTable