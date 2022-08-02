import { Grid, Box } from "@mui/material";
import React from "react";
import ProductCountUp from "../../../Components/ReportersManagementModule/CountUps/CountUpStack";
import CreateProduct from "../../../Components/ReportersManagementModule/ProductCreate/CreateProduct";
import CustomizedTeamView from "../../../Components/ReportersManagementModule/CustomizedTemView/CustomizedTeamView";

function CreateProductPage() {
  return (
    <div>
      <Grid container sx={{backgroundColor:"#dcdfe0"}}>
        <Grid item md={8}>
          <Box padding={2}>
            <ProductCountUp />
            <CreateProduct />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box padding={2} sx={{mt:4}}>
            <CustomizedTeamView />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateProductPage;
