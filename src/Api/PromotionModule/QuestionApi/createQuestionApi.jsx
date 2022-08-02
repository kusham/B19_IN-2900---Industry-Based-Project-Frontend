import * as api from "../../index";

export const createQuestionApi = async (Question) => {
  console.log(" from createQuestionApi");
  try {
    const { data } = await api.createQuestions(Question);
    console.log("createQuestionsApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
