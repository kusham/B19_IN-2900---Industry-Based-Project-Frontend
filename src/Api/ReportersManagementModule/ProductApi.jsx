import * as api from "../index";
export const createProduct = async (productCreateData) => {
  try {
    const productcreate = {
      productID: productCreateData.productID,
      productName: productCreateData.productName,
      description: productCreateData.description,
      teamNames: productCreateData.nameofTeam.teamName,
    };

    const { data } = await api.createProduct(productcreate);
    return data;
  } catch (err) {
    return err.response;
    // console.log(err);
  }
};

export const updateProduct = async (updateProdData, id) => {
  try {
    const updateProd = {
      productID: updateProdData.productID,
      productName: updateProdData.productName,
      description: updateProdData.description,
    };
    const { data } = await api.updateProduct(updateProd, id);
    return data;
  } catch (err) {
    return err.response;
    // console.log(err);
  }
};

export const viewProducts = async (viewproducts) => {
  try {
    const { data } = await api.viewPProducts(viewproducts);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
