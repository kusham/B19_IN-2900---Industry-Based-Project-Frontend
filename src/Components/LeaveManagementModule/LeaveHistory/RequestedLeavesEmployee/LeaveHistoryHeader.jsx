import { Box, Divider, Grid,  Typography } from "@mui/material";
import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";


const LeaveHistoryHeader = () => {
  return (
    <Box sx={{mb : 3}}>
      {/* <Paper elevation={3} square sx={{ p: 2 , backgroundColor:"#e1bee7"}}> */}
        <Grid container>
          <Grid md={6} item sx={{display:"flex"}}>
            <AppRegistrationIcon fontSize="large"  sx={{ mr: 1 , color:"#9c27b0"}} />
            <Typography variant="h4" color="#9c27b0" fontWeight={500} sx={{mb:"4"}}>
              Leaves List
            </Typography>
            
          </Grid>
        </Grid>
       {/* <Divider sx={{background:"#c6ff00"}}></Divider>
       <Divider sx={{background:"#c6ff00"}}></Divider>
       <Divider sx={{background:"#c6ff00"}}></Divider>
       <Divider sx={{background:"#c6ff00"}}></Divider>
       <Divider sx={{background:"#c6ff00"}}></Divider>
       <Divider sx={{background:"#c6ff00"}}></Divider>
     */}
      {/* </Paper> */}
    </Box>
  );
};

export default LeaveHistoryHeader;
