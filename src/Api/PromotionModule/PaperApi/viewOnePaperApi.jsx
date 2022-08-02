import * as api from "../../index";

export const viewOnePaperApi = async (PaperID) => {
  try {
    const { data } = await api.viewOnePaper(PaperID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
