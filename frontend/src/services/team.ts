import { IaddTeam } from 'app/interfaces/add_team';
import config from 'config/config'
import axios from "utils/axios";

interface IteamMember{
    team_id: string | undefined,
    employee_id: number[] | undefined
}

export const getAllTeamsData = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/all_teams`
        );

        console.log('data from teams: ', data);
        console.log('data ', data.teams);
      
        return data.teams;
    } catch (error) {
        console.log('error in data from teams', error);
        return null;
    }
};

export const getTeamDatabyId = async (id: any) => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/team/${id}`
        );

        console.log('data from team by id: ', data);
        console.log('data ', data.team);
      
        return data.team;
    } catch (error) {
        console.log('error in team data by id', error);
        return null;
    }
};

export const addTeamData = async (body: IaddTeam) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/create_team`, body
        );

        console.log('data from add team: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add team', error);
        return null;
    }
};

export const updateTeamData = async (body: IaddTeam, team_id: any) => {
    try {
        const  response: any = await axios.patch(
            `${config.defaults.api_url}/update_team/${team_id}`, body
        );

        console.log('update data from team: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in update team', error);
        return null;
    }
};

export const deleteTeamById = async (id: number | undefined) => {
    try {
        const  response: any = await axios.delete(
            `${config.defaults.api_url}/delete_team/${id}`
        );

        console.log('response from delete team: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete team by id', error);
        return null;
    }
};

export const deleteTeamMember = async (body: any) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/remove_employee`, body
        );

        console.log('response from delete team member: ', response);
       // console.log('data employee', data.IncrementHistory);
      
        return response;
    } catch (error) {
        console.log('error in delete team member ',error);
        return null;
    }
};

export const getAvailableEmployees = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/left_out_employees`
        );

        console.log('data from left_out_employees: ', data);
        console.log('data ', data.employees);
      
        return data.employees;
    } catch (error) {
        console.log('error in left_out_employees', error);
        return null;
    }
};

export const addTeamMember = async (body: IteamMember) => {
    try {
        const  response: any = await axios.post(
            `${config.defaults.api_url}/add_employee`, body
        );

        console.log('data from add team member: ', response);
       // console.log('data ', data.finance);
      
        return response;
    } catch (error) {
        console.log('error in add team member', error);
        return null;
    }
};

export const getTeamLeads = async () => {
    try {
        const  {data}: any = await axios.get(
            `${config.defaults.api_url}/team_leads`
        );

        console.log('data from team leads: ', data);
        console.log('data ', data.teams);
      
        return data.team_leads;
    } catch (error) {
        console.log('error in team leads', error);
        return null;
    }
};