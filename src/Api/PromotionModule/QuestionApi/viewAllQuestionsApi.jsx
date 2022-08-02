import * as api from "../../index";

export const viewAllQuestionsApi = async () => {
  try {
    const { data } = await api.viewAllQuestions();
    return data;
  } catch (error) {
    console.log(error);
  }
};
