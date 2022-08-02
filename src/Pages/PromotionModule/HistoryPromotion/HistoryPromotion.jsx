import { Box, Grid } from "@mui/material";
import React from "react";
import History from "../../../Components/PromotionModule/History/History";
import JobRoleStats from "../../../Components/PromotionModule/History/JobRoleStats/JobRoleStats";

const HistoryPromotion = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item md={9}>
          <History />
        </Grid>
        <Grid item md={3}>
          <JobRoleStats />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoryPromotion;
