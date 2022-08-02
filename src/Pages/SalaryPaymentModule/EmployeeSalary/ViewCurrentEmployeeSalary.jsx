import React from "react";
import ViewEmloyeesalary from "../../../Components/SalaryPaymentModule/EmployeeSalary/ViewEmloyeesalary/ViewEmloyeesalary";

const ViewCurrentEmployeeSalary = ({ user }) => {
  return (
    <div>
      <ViewEmloyeesalary user={user} />
    </div>
  );
};

export default ViewCurrentEmployeeSalary;
