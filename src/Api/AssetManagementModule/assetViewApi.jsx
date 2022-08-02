import * as api from "../index";

export const availableAssetsApi = async () => {
  try {
    const { data } = await api.availableAssets();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unavailableAssetsApi = async () => {
  try {
    const { data } = await api.nonavailableAssets();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const allAssets = async () => {
  try {
    const { data } = await api.allAssets();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const modelViewApi = async (id) => {
  try {
    const { data } = await api.eachAssetDetails(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unassignAsset = async (id) => {
  try {
    const { data } = await api.unassign(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const releaseFaultAsset = async (id) => {
  try {
    const { data } = await api.releaseFault(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createFaultAsset = async (id) => {
  try {
    const { data } = await api.createFault(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const assignAssets = async (assignAsset, employee) => {
  try {
    const { data } = await api.assignAsset(assignAsset, employee);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const searchAssetCategory = async (assetCategory) => {
  try {
    const { data } = await api.searchAssetCategory(assetCategory);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateAssets = async (id, asset) =>{
  try{
    const { data } = await api.updateAsset(id,asset);
    return data;
  }catch (error) {
    console.log(error);
  }
}
export const searchAvailableAssetCategory = async (assetCategories) => {
  try {
    const { data } = await api.availableAssetCategory(assetCategories);
    return data;
  } catch (error) {
    console.log(error);
  }
};



