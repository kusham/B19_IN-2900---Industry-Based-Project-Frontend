import * as api from "../../index";

export const submitPaperApi = async (EmployeeID, Questions, PaperID) => {
  try {
    const ans = { PaperID: PaperID, Questions: Questions };
    const { data } = await api.submitPaper(EmployeeID, ans);
    return data;
  } catch (error) {
    console.log(error);
  }
};
