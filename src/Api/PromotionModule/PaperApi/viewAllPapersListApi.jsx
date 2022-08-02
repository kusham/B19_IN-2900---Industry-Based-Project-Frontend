import * as api from "../../index";

export const viewAllPapersListApi = async () => {
  try {
    const { data } = await api.viewAllPapersList();
    return data;
  } catch (error) {
    console.log(error);
  }
};
