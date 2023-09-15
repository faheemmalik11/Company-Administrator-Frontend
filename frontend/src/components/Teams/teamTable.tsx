import { ITeam } from "app/interfaces/team";
import React, {useState, useEffect} from "react";
import { getAllTeamsData } from "services/team";
import { dateFormat } from "utils/date";
import { Link, useNavigate } from "react-router-dom";
import Modal from "UI/Modal";
import DeletePopup from "UI/deletePopup";
import DataTable from "react-data-table-component";
import { customStyles } from "UI/tableStyle";
import { Tooltip } from "react-tooltip";
import { deleteTeamById } from "services/team";

interface Props {
    update_id: number | undefined,
}

const TeamTable: React.FC<Props>  = ({update_id}) => {
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState<ITeam[]>([]);
    const [deleteDependency, setDeleteDependency] = useState<boolean>(false);
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [highlightedId, setHighlightedId] = useState<number>();
    const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
    const [team_id, setTeam_id] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        
        const getAllTeams = async () => {
            setDeleteDependency(false);
            const response = await getAllTeamsData();

            for (let i = 0; i < response.length; i++) {
                if (response[i].updated_at) {
                    const date = dateFormat(response[i].updated_at);
                    response[i].updated_at = date
                }
                if (response[i].created_at) {
                    const date = dateFormat(response[i].created_at);
                    response[i].created_at = date
                }

            }
            setTeamData(response);

            // if (location.state !== null) {
            //     setUpdateId(location.state.finance_id);
            // }
        }
        getAllTeams()
    }, [deleteDependency]);

    useEffect(() => {
        setHighlightedId(update_id)
        setIsHighlighted(true)
        setTimeout(() => {
            setIsHighlighted(false);
            setHighlightedId(0)
        }, 3000);
    }, [update_id])

    const columns = [
        {
            name: 'Id',
            cell: (row: ITeam) => row.id
        },
        {
            name: 'Name',
            cell: (row: ITeam) => <Link to={`/team_members/${row.id}`} state={{team_lead_id: row.team_lead_id}}>{row.name}</Link>
        },
        {
            name: 'Description',
            cell: (row: ITeam) => <button  data-tooltip-id="my-tooltip"
            data-tooltip-content={row.description} >
                <Tooltip id="my-tooltip" style={{width: '300px', zIndex: 99}}/>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg></button>
        },
        {
            name: 'Team lead Id',
            cell: (row: ITeam) => row.team_lead_id
        },
        {
            name: 'Created at',
            cell: (row: ITeam) => row.created_at
        },
        {
            name: 'Company Id',
            cell: (row: ITeam) => row.company_id
        },
        {
            name: 'Updated at',
            cell: (row: ITeam) => row.updated_at
        },
        {
            name: 'Action',
            cell: (row: ITeam) => <button title='update store data' onClick={() => {updateHandler(row.id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>

        },
        {
            name: 'Delete',
            cell: (row: ITeam) => <button title='delete store data' onClick={() => {deleteHandler(row.id)}}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg></button>

        }
    ]

    const deleteHandler = (id: number | undefined) => {
         setTeam_id(id);
         setIsDeletePopup(true)
    }

    const updateHandler = (id: number | undefined) => {
        navigate(`/update_team/${id}`)
    }

    const deleteHandlerInPopup = async (id: number | undefined) => {
        setIsLoading(false);
        const response = await deleteTeamById(id);
        if (response.code === 200) {
            setIsDeletePopup(false);
            setDeleteDependency(true);
        }
        else {

        }
    }

    return(
        <React.Fragment>

            <Modal isOpen={isDeletePopup} onClose={() => { setIsDeletePopup(false) }}>
                {isDeletePopup && <DeletePopup
                    setIsDeletePopup={setIsDeletePopup}
                    id={team_id}
                    isLoading={isLoading}
                    deleteHandlerInPopup={deleteHandlerInPopup} />}
            </Modal>

            <DataTable columns={columns}
                data={teamData} 
                pagination
                fixedHeader
                fixedHeaderScrollHeight='550px'
                customStyles={customStyles} />

{/* <tr className={((highlightedId == team.id) && isHighlighted) ? `bg-sky-500/100 border-2 border-green-600 ` : 'border-2'} key={team.id}></tr> */}
            
        </React.Fragment>
    )
}

export default TeamTable