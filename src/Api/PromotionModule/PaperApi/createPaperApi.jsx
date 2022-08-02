import * as api from "../../index";

export const createPaperApi = async (newPaper) => {
  console.log("newPaper from frontend", newPaper);
  try {
    console.log("createPaperApi executed");
    const { data } = await api.createPaper(newPaper);
    console.log("createPaperApi executed 2");
    return data;
  } catch (error) {
    return console.log(error);
  }
};
