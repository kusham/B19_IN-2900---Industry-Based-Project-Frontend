import * as api from "../../index";

export const viewSummarySalaryApi = async () => {
  console.log("viewSummarySalaryApi")
  try {
    const { data } = await api.viewSummarySalarySheet();
    return data;
  } catch (error) {
    console.log(error);
  }
};
