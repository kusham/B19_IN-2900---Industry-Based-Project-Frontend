import * as api from "../index";
export const createTeams = async (teamCreateData) => {
  try {
    const teamcreate = {
      teamName: teamCreateData.teamName,
      teamLeadID: teamCreateData.teamLead.employeeID,
      teamMembers: teamCreateData.teamMembers.map(
        ({ employeeID }) => employeeID
      ),
    };
    const {data} = await api.createTeams(teamcreate);
    return data;
  } catch (error) {
    return error.response
    // console.log(error);
  }
};

export const updateTeam = async (updateteam, id) => {
  try {
    const updateTeam = {
      teamName: updateteam.teamName,
      teamLeadID: updateteam.teamLeader.employeeID,
      teamMembers: updateteam.teamMembers.map((member) => member.employeeID),
    };
    const { data } = await api.updateTeam(updateTeam, id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesWithoutTeam = async (getEmpWithoutTeam) => {
  try {
    const { data } = await api.getEmployeesWithoutTeam(getEmpWithoutTeam);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const viewAllTeams = async (displayTeams) => {
  try {
    const { data } = await api.viewAllTeams(displayTeams);
    data.data.map((team) => {
      let teamMembers = [];
      team.TeamWithEmp.map((member) => {
        const { employeeFirstName, employeeLastName, employeeID, profilePic,jobRole } =
          member;

        teamMembers.push({
          employeeName: employeeFirstName + " " + employeeLastName,
          employeeID,
          profilePic,
          jobRole
        });
      });
      team.TeamWithEmp = teamMembers;
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeams = async (allteams) => {
  try {
    const { data } = await api.getAllTeams(allteams);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
