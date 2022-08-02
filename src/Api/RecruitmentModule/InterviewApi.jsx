import * as api from "../index";

export const fetchEmployees = async () => {
  try {
    const { data } = await api.fetchEmployees();
    console.log(data)
    let employees = [];
    await Promise.all(
      data.data.map(async (employee) => {
        const {
          employeeID,
          employeeFirstName,
          employeeLastName,
          NIC,
          profilePic,
        } = employee;

        employees.push({
          employeeID,
          employeeName: employeeFirstName + " " + employeeLastName,
          NIC,
          profilePic,
        });
      })
    );
    return employees;
  } catch (error) {
    console.log(error);
  }
};

export const createInterview = async (interview) => {
  try {
    const {
      candidate,
      InterviewType,
      InterviewDate,
      InterviewTime,
      Interviewers,
    } = interview;
    // let interviewers = [];
    // await Promise.all(
    //   Interviewers.map((interviewer) => (
    //     interviewers.push({ id: interviewer.employeeID })
    //   ))

    // )
    const interviewData = {
      candidateID: candidate._id,
      InterviewType: InterviewType,
      InterviewDate: InterviewDate.toDateString(),
      InterviewTime: InterviewTime.toTimeString(),
      Interviewers,
    };
    const response = await api.createInterview(interviewData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewList = async () => {
  try {
    const employeeID = JSON.parse(sessionStorage.getItem("user")).employeeID;
    const { data } = await api.getInterviewList(employeeID);
    return data.Interviews;
  } catch (error) {
    console.log(error);
  }
};

export const updateInterview = async (interview, interviewID) => {
  try {
    console.log(interviewID);
    const {
      candidateID,
      InterviewType,
      InterviewDate,
      InterviewTime,
      Interviewers,
    } = interview;
    let interviewers = [];
    await Promise.all(
      Interviewers.map((interviewer) =>
        interviewers.push({ id: interviewer.employeeID })
      )
    );
    const interviewData = {
      candidateID,
      InterviewType: InterviewType,
      InterviewDate: new Date(InterviewDate).toDateString(),
      InterviewTime: new Date(InterviewTime).toTimeString(),
      InterviewerID: interviewers,
    };
    const { data } = await api.updateInterview(interviewData, interviewID);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelInterview = async (interviewID) => {
  try {
    const { data } = await api.cancelInterview(interviewID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const markedCandidate = async (marks, interviewID) => {
  try {
    const {
      interviewer,
      knowledgeOfSpecificJobSkills,
      relatedJobExperience,
      relatedEducationOrTraining,
      initiative,
      communicationOrListeningSkills,
      attitude,
      interestInCompanyOrPosition,
      strengths,
      weaknesses,
      additionalComments,
      selectedForTheSecondInterview,
      selected,
      Reject,
    } = marks;
    const recommendation =
      selectedForTheSecondInterview === true
        ? "Passed 1st"
        : selected === true
        ? "Selected"
        : Reject === true
        ? "Rejected"
        : "Hold";
    const { data } = await api.markedCandidate(
      {
        interviewer,
        knowledgeOfSpecificJobSkills,
        relatedJobExperience,
        relatedEducationOrTraining,
        initiative,
        communicationOrListeningSkills,
        attitude,
        interestInCompanyOrPosition,
        strengths,
        weaknesses,
        additionalComments,
        recommendation,
      },
      interviewID
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewStats = async () => {
  try {
    const { data } = await api.getInterviewStats(
      JSON.parse(sessionStorage.getItem("user")).employeeID
    );
    return data.InterviewStats;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewResult = async (interviewType, candidateID) => {
  try {
    const interview = {
      interviewType: interviewType,
      candidateID: candidateID,
    };
    const { data } = await api.getInterviewResult(interview);
     return data.InterviewResult;
  } catch (error) {
    console.log(error);
  }
};
