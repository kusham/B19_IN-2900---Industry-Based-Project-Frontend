import * as api from "../../index";

export const updateExamDetailsApi = async (EmployeeID, ExamID, examDetails) => {
  try {
    const { data } = await api.updateExamDetails(
      EmployeeID,
      ExamID,
      examDetails
    );
    console.log("updateExamDetailsApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
