import { Box, Card, Grid } from "@mui/material";
import React from "react";
import AllRecentEmployees from "../../../Components/ReportersManagementModule/RecentSection/AllRecentEmployees";
import MainBox from "../../../Components/ReportersManagementModule/RecentSection/MainBox";

function RecentSection() {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container>
        <Grid item md={8}>
        <MainBox/>
        </Grid>
        <Grid item md={4}>
          <AllRecentEmployees />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RecentSection;
