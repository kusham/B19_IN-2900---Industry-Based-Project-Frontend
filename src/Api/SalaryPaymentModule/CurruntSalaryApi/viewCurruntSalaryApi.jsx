import * as api from "../../index";

export const viewCurruntSalaryApi = async () => {
  try {
    const { data } = await api.viewCurrentSalarySheet();
    return data;
  } catch (error) {
    console.log(error);
  }
};
