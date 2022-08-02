import * as api from "../../index";

export const deleteCurrentSalaryApi = async (EmployeeID) => {
  try {
    const { data } = await api.deleteCurrentSalarySheet(EmployeeID);
    console.log("deleteCurruntSalaryApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
