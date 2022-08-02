import * as api from "../../index";

export const allSubmissionsApi = async () => {
  try {
    const { data } = await api.allSubmissions();
    return data;
  } catch (error) {
    console.log(error);
  }
};
