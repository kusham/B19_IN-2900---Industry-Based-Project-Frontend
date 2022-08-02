import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getEmployees } from '../../../Api/LeaveManagementModule/LeaveApi'
import AllEmployees from '../../../Components/LeaveManagementModule/IncreaseEntitledLeaves/AllEmployees/AllEmployees'
import IncreaseEntitledLeaves from '../../../Components/LeaveManagementModule/IncreaseEntitledLeaves/IncreaseLeaves/IncreaseEntitledLeaves'

const IncreaseLeavesHr = () => {
    const [employeesList, setEmployeesList] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [leaveBalance, setLeaveBalance] = useState({});
    const [render, setRender] = useState(true);
    

    const fetchData = async () => {
        setEmployeesList(await getEmployees());
      };
    
      useEffect(() => {
        fetchData();
      }, []); 
  return (

        <Box sx={{p:4}}>
            <Grid sx={{mb:4}}>
                <Typography variant="h4" color="#9c27b0" fontWeight={500} >Increase Entitled Leaves</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <AllEmployees  render={render} employeesList={employeesList} setEmployee={setEmployee} setLeaveBalance={setLeaveBalance}/>
                </Grid>
                <Grid item md={8}>
                <IncreaseEntitledLeaves render={render} setRender={setRender} employee={employee} setLeaveBalance={setLeaveBalance} leaveBalance={leaveBalance} />
                </Grid>
            </Grid>
        
        </Box>
    
  )
}
 
export default IncreaseLeavesHr  