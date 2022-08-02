import * as api from "../../index";

export const displayPaperApi = async (EmployeeID) => {
  try {
    const { data } = await api.displayPaper(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
