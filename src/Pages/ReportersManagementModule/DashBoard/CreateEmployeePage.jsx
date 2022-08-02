import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateEmployee from "../../../Components/ReportersManagementModule/CreateEmployeeForm/CreateEmployee";
import ProductCountUp from "../../../Components/ReportersManagementModule/CountUps/CountUpStack";
import CustomizedTeamView from "../../../Components/ReportersManagementModule/CustomizedTemView/CustomizedTeamView";
import { getCandidates } from "../../../Api/ReportersManagementModule/EmployeeApi";

function CreateEmployeePage() {
  const [candidates, setCandidates] = useState();
  useEffect(() => {
    async function fetchData() {
      setCandidates(await getCandidates());
    }
    fetchData();
  
    
  }, []);
  console.log(candidates)
  return (
    <div>
      <Grid container  sx={{backgroundColor:"#dcdfe0"}}>
        <Grid item md={8}>
          <Box padding={2} sx={{mb:7}} >
            <ProductCountUp />
            <Grid sx={{ mt: 2 }}>
              <CreateEmployee candidates={candidates}/>
            </Grid>
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

export default CreateEmployeePage;
