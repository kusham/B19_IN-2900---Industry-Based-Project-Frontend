import * as api from "../../index";

export const viewSalaryRatesApi = async (EmployeeID) => {
  try {
    const { data } = await api.viewSalaryRates(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
