import * as api from "../../index";

export const scheduleExamApi = async (EmployeeID, examDetails) => {
  console.log("scheduleExamApi executed");
  try {
    const { data } = await api.scheduleExam(EmployeeID, examDetails);
    console.log("scheduleExamApi executed 2");
    return data;
  } catch (error) {
    console.log(error);
  }
};
