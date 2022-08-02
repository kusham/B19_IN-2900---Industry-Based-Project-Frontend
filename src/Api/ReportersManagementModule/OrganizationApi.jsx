import * as api from "../index";
export const createOrganization = async (levelData) => {
  console.log(levelData);
  try {
    const { data } = await api.createOrganization(levelData);
    console.log(data);
    return data;
  } catch (err) {
    return err.response;
    // console.log(err);
  }
};

export const updateOrganization = async (updateorg, id) => {
  try {
    // const updateOrg = {
      // level: updateorg.level,

      // jobRole: updateorg.jobRole.map((job) => job),
    // };
    console.log(updateorg)
    const { data } = await api.updateOrganization(updateorg, id);
    return data;
  } catch (error) {
    return error;
    //   console.log(error);
  }
};

export const getLevels = async () => {
  try {
    const { data } = await api.getLevels();
    // console.log(data)
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOrganizationStructure = async () => {
  try {
    const { data } = await api.getOrganizationStructure();
     console.log(data)
   
  } catch (err) {
    console.log(err);
  }
};