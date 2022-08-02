import {Grid} from '@mui/material'
import React, {useEffect, useState} from 'react'
import { getLeaveBalance } from '../../../Api/LeaveManagementModule/LeaveApi'
import RemaningLeaves from '../../../Components/LeaveManagementModule/RemaningLeaves/RemaningLeaves'
import RequestLeaveForm from '../../../Components/LeaveManagementModule/RequestLeaveForm/RequestLeaveForm'
import TeamLead from '../../../Components/LeaveManagementModule/TeamLead/TeamLead'

const RequestLeaves = () => {
  const [leaveBalance, setLeaveBalance] = useState({});
  
  const fetchData = async () => {
    setLeaveBalance(await getLeaveBalance(null));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    
      <Grid container>
        <Grid item sm={8} md={8}>
          <Grid container>
            <Grid item sm={12} md={12}>
              <RemaningLeaves leaveBalance={leaveBalance}/>
            </Grid>
            <Grid item sm={12} md={12}>
              <RequestLeaveForm leaveBalance={leaveBalance}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} md={4}>
          <TeamLead/>
        </Grid>
      </Grid>
    
  )
}

export default RequestLeaves