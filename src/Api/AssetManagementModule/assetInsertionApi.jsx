import * as api from "../index";

export const assetInsertionApi = async (asset) => {
  try {
    const { data } = await api.insertAsset(asset);
    return data;
  } catch (error) {
    console.log(error);
  }
};
