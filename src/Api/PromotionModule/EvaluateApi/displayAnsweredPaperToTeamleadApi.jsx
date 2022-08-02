import * as api from "../../index";

export const displayAnsweredPaperToTeamleadApi = async (
  EmployeeID,
  PaperID
) => {
  try {
    const { data } = await api.displayAnsweredPaperToTeamlead(
      EmployeeID,
      PaperID
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
