import { Box, Grid } from "@mui/material";
import React from "react";
import ProductCountUp from "../../../Components/ReportersManagementModule/CountUps/CountUpStack";
import CustomizedTeamView from "../../../Components/ReportersManagementModule/CustomizedTemView/CustomizedTeamView";
import CreateTeams from "../../../Components/ReportersManagementModule/TeamCreate/CreateTeams";

function CreateTeamPage({ teamcreate }) {
  return (
    <div>
      <Grid container sx={{backgroundColor:"#dcdfe0"}}>
        <Grid item md={8}>
          <Box padding={2}>
            <ProductCountUp />
            <CreateTeams teamcreate={teamcreate} />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box padding={2} sx={{ mt: 4 }}>
            <CustomizedTeamView />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateTeamPage;
