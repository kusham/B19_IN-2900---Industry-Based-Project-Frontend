import { Box, Grid } from "@mui/material";
import React from "react";
import JobPositions from "../../../Components/PromotionModule/PromoteEmployees/JobPositions";
import PromoteEmployee from "../../../Components/PromotionModule/PromoteEmployees/PromoteEmployee";

const PromoteEmployees = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container>
        <JobPositions />
        <PromoteEmployee />
      </Grid>
    </Box>
  );
};

export default PromoteEmployees;
