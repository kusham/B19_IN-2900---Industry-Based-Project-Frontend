import * as api from "../index";

export const LogoutApi = async () => {
    try {
     await api.logOut(JSON.parse(sessionStorage.getItem("user")).employeeID);
    } catch (error) {
      console.log(error);
    }
  };
  