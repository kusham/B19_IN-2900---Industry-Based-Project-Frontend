import { Grid, Box } from "@mui/material";
import React from "react";
import LeaveHistoryHeader from "../../../Components/LeaveManagementModule/LeaveHistory/RequestedLeavesEmployee/LeaveHistoryHeader";
import RequestedLeavesTeamLead from "../../../Components/LeaveManagementModule/LeaveHistory/RequestedLeavesTeamLead/RequestedLeavesTeamLead";

const RequestedLeaveList = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Grid container>
        <Grid item sm={12} md={12}>
          <LeaveHistoryHeader />
        </Grid>
        <Grid item sm={12} md={12}>
          <RequestedLeavesTeamLead />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestedLeaveList;
