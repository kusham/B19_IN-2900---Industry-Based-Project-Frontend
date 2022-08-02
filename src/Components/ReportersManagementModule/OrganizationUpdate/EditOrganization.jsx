// import { Box, Button, Divider, FormLabel, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
// import React from 'react'
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import useStyles from "./EditOrganizationStyles";
// import GridViewIcon from '@mui/icons-material/GridView';
// function EditOrganization() {

  
//     const classes = useStyles();
//   return (
//     <Box padding={8} bgcolor="#d7dde0" mt={5}>
//     <Paper sx={{ padding: 8 }}>
//       <Typography variant="h5" fontWeight="bold" className={classes.head}><GridViewIcon/>&nbsp;
//         Create Organization Structure
//       </Typography>
//       <Divider sx={{ mt: 4, mb: 5 }}></Divider>
//       <Grid container>
//         <Grid item md={6}>
//           <Grid container>
//             <Grid item md={3}>
//               <FormLabel sx={{ mt: 2, fontWeight: "bold" }}>
//                 Level :
//               </FormLabel>
//             </Grid>
//             <Grid item md={9}>
//             <TextField
//                 id="filled-basic"
//                 label="Level"
//                 variant="filled"
//                 name="level"
//                 fullWidth
//               ></TextField>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item md={6} textAlign="right">  <Button className={classes.button} variant="contained">
//             Organization structure
//           </Button></Grid>
//       </Grid>

//       <Grid container sx={{ mt: 6 }}>
//         <Grid item md={6}>
//           <Grid container>
//             <Grid item md={3}>
//               <FormLabel sx={{ mt: 2, fontWeight: "bold" }}>
//                 Job Role :
//               </FormLabel>
//             </Grid>
//             <Grid item md={9}>
//             <IconButton>
//                 <AddCircleIcon sx={{ color: "gray" }} fontSize="large" />
//               </IconButton>
             
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item md={6} textAlign="right"> <Button className={classes.button} variant="contained">
//             create
//           </Button></Grid>
//       </Grid>

//       <Grid container sx={{ mt: 10 }}>
//         <Grid item md={6}>
        
//         </Grid>
//         <Grid item md={6} >
         
//         </Grid>
//       </Grid>
//     </Paper>
//   </Box>
//   )
// }

// export default EditOrganization