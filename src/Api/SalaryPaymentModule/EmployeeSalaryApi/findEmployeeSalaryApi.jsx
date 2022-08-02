import * as api from "../../index";

export const findEmployeeSalaryApi = async (EmployeeID) => {
  try {
    const { data } = await api.findEmployeeSalarySheet(EmployeeID);
        return data;
  } catch (error) {
    console.log(error);
  }
};
