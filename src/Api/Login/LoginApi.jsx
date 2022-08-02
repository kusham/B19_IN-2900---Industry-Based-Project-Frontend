import axios from "axios";
import * as api from "../index";
export const LoginApi = async (user) => {
  try {
    const User = { userName: user.userName, password: user.password };

    const {data} = await axios.post("http://localhost:8070/login", User);
    console.log(data);
    if (data.success === true) {
      console.log("first")
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("access", JSON.stringify(data.accessToken));
      sessionStorage.setItem("refresh", JSON.stringify(data.refreshToken));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createFirstEmployee = async (employeesData) => {
  try {
    const employee = {
      employeeID: String(employeesData.employeeID),
      employeeFirstName: String(employeesData.employeeFirstName),
      employeeLastName: String(employeesData.employeeLastName),
      jobRole: String(employeesData.jobRole),
      NIC: String(employeesData.NIC),
      companyEmail: String(employeesData.companyEmail),
      candidateID: String(employeesData.candidateID),
    };

    const { data } = await api.createFirstEmployeeAsHR(employee);
    if (data.success === true) {
      console.log("first")
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("access", JSON.stringify(data.accessToken));
      sessionStorage.setItem("refresh", JSON.stringify(data.refreshToken));
    }
    return data;
  } catch (error) {
    return error.response;
  }
};