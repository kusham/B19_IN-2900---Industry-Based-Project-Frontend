import * as api from "../../index";

export const deletePaperAPi = async (PaperID) => {
  try {
    const { data } = await api.deletePaper(PaperID);
    console.log("deletePaperAPi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
