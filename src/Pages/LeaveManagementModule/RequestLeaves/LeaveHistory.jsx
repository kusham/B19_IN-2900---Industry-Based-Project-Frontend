import { Box, Grid } from '@mui/material'
import React from 'react'
import LeaveHistoryHeader from '../../../Components/LeaveManagementModule/LeaveHistory/RequestedLeavesEmployee/LeaveHistoryHeader'
import LeaveHistoryTable from '../../../Components/LeaveManagementModule/LeaveHistory/RequestedLeavesEmployee/LeaveHistoryTable'

const LeaveHistory = () => {
  return (
    <Box sx={{m : 4}}>
    <Grid container >
        <Grid item sm={12} md={12}>
            <LeaveHistoryHeader/>
        </Grid>
        <Grid item sm={12} md={12}>
            <LeaveHistoryTable/>

        </Grid>
    </Grid>

    </Box>
  )
}

export default LeaveHistory
