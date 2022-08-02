import * as api from "../../index";

export const viewOneExamApi = async (EmployeeID, ExamID) => {
  try {
    const { data } = await api.viewOneExam(EmployeeID, ExamID);
    console.log("viewOneExamApi executed");
    return data;
  } catch (err) {
    console.log(err);
  }
};
