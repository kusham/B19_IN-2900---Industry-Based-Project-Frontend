import * as api from "../../index";

export const addMoreQuestionsApi = async (PaperID, selectedQuestions) => {
  try {
    const { data } = await api.addMoreQuestions(PaperID, selectedQuestions);
    console.log("addMoreQuestionsApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
