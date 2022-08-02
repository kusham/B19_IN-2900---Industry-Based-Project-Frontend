import * as api from "../../index";

export const displayFeedbackApi = async (EmployeeID) => {
  try {
    const { data } = await api.displayFeedback(EmployeeID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
