import * as api from "../../index";

export const findCurrentSalaryAPi = async (EmployeeID) => {
  try {
    const { data } = await api.findCurrentSalarySheet(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
