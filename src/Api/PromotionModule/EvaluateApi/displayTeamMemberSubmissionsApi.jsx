import * as api from "../../index";

export const displayTeamMemberSubmissionsApi = async (TeamLeadID) => {
  try {
    const { data } = await api.displayTeamMemberSubmissions(TeamLeadID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
