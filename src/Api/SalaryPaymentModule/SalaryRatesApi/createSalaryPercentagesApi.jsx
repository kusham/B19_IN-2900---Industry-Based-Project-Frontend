import * as api from "../../index";

export const createSalaryPercentagesApi = async (EmployeeID, rates) => {
  console.log("createSalaryPercentagesApi executed 1");
  try {
    const { data } = await api.createSalaryPercentages(EmployeeID, rates);
    console.log("createSalaryPercentagesApi executed 2");
    return data;
  } catch (error) {
    console.log(error);
  }
};
