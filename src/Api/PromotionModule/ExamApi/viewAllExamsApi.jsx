import * as api from "../../index";

export const viewAllExamsApi = async (EmployeeID) => {
  try {
    const { data } = await api.viewAllExams(EmployeeID);
    //console.log("viewAllExamsApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
