import * as api from "../../index";

export const deleteScheduledExamApi = async (EmployeeID, ExamID) => {
  try {
    const { data } = await api.deleteScheduledExam(EmployeeID, ExamID);
    console.log("Exam Deleted");
    return data;
  } catch (error) {
    console.log(error);
  }
};
