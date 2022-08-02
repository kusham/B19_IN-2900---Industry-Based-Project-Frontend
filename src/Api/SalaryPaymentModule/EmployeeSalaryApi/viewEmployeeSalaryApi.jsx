import * as api from "../../index";

export const viewEmployeeSalaryApi = async (EmployeeID) => {
  try {
    const { data } = await api.viewCurrentEmployeeSalarySheet(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
