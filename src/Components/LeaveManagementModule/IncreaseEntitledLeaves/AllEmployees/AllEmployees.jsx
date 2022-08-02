import { Search } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { getEmployees, getLeaveBalance, getLeaveBalanceOfEmployee } from "../../../../Api/LeaveManagementModule/LeaveApi";
import SearchIcon from '@mui/icons-material/Search';

import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";
import useStyles from "./AllEmployeesStyle";
import { render } from "@testing-library/react";



const AllEmployees = ({employeesList, setEmployee,setLeaveBalance}) => {
  const classes = useStyles();
  

  const handleClick = async (employees) => {
    setEmployee(employees);
    setLeaveBalance(await getLeaveBalanceOfEmployee(employees.employeeID));
  };



  return (
    <Grid container>
      <Scrollbars style={{ height: 700}}>
        <Box sx={{ mt: 0, padding: 2 }}>
          {employeesList &&
            employeesList.map((employees) => (
              <Card className={classes.card}
              
                key={employees._id}
                onClick={() => {
                  handleClick(employees);
                 
                }}
                
              >
                <CardActionArea sx={{ p: 2 }}>
                  <Grid container s>
                    <Grid item md={2}>
                      <Avatar src={employees.profilePic} />
                    </Grid>
                    <Grid
                      item
                      md={10}
                      
                      sx={{ padding: "auto",direction:"row",
                      justifyContent:"center",
                      alignItems:"center" }}
                    >
                      <Typography variant="h7">
                      {(
                        employees.employeeFirstName +
                        " " +
                        employees.employeeLastName
                      ).toUpperCase()}</Typography>
                      <Grid><Typography variant="h8">{employees.employeeID}</Typography></Grid>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            ))}
        </Box>
      </Scrollbars>
     
    </Grid>
  );
};

export default AllEmployees;
