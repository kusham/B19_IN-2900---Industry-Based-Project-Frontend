import React from "react";
import SideBar from "../../Components/Navigation/SideBar/SideBar";
import ViewAssets from "../../Components/AssetManagementModule/ViewAsset";
import { Grid } from "@mui/material";
import AssetViewStats from "../../Components/AssetManagementModule/AssetViewStats";

const ViewAsset = () => {
  return (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid item md={8.6}>
        <Grid container>
          <Grid item sm={12} md={12}>
            <AssetViewStats />
          </Grid>
          
          <Grid
            item
            sm={12}
            md={12}
            sx={{
              mt: 2,
            }}
          >
            <ViewAssets />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3.4}>
        {/* <Grid>
        <InterviewerCalender />

        </Grid> */}
        
      </Grid>
    </Grid>
  );
};

export default ViewAsset;
