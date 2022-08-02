import * as api from "../../index";

export const updateCurruntSalaryApi = async (
  EmployeeID,
  currentDataRecords
) => {
  try {
    const currentData = {
      EmployeeID: currentDataRecords.EmployeeID,
      BasicSalary: currentDataRecords.BasicSalary,
      VehicleAllowance: currentDataRecords.VehicleAllowance,
      InternetAllowance: currentDataRecords.InternetAllowance,
    };
    const { data } = await api.updateCurrentSalarySheet(
      EmployeeID,
      currentData
    );
    return data;
  } catch (error) {
    console.log({ error: error.message });
  }
};
