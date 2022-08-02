import * as api from "../../index";

export const evaluatePaperApi = async (
  TeamLeadID,
  EmployeeID,
  PaperID,
  Curruntdata,
  Feedback
) => {
  try {
    const content = { Feedback: Feedback, Questions: Curruntdata };
    const { data } = await api.evaluatePaper(
      TeamLeadID,
      EmployeeID,
      PaperID,
      content
    );
    return data;
  } catch (error) {
    console.log("eror from evaluatePaperApi:", error);
  }
};
