import * as api from "../../index";

export const findSummarySalaryApi = async (EmployeeID) => {
  try {
    const { data } = await api.findSummarySalarySheetByEid(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
