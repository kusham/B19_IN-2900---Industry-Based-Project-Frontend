import * as api from "../../index";

export const updatePaperDetailsApi = async (PaperID, currentData) => {
  try {
    const { data } = await api.updatePaperDetails(PaperID, currentData);
    console.log("updatePaperDetailsApi executed");
    return data;
  } catch (error) {
    console.log(error);
  }
};
