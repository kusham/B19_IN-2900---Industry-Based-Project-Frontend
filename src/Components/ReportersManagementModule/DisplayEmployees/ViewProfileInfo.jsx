// // import { Grid, Box } from "@mui/material";
// // import React from "react";

// // function ViewProfileInfo({ employee }) {
// //   return (
// //     <div>
// //       <Box></Box>
// //     </div>
// //   );
// // }

// // export default ViewProfileInfo;
// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import { viewAllEmployees } from "../../../Api/ReportersManagementModule/EmployeeApi";
// import ProductCountUp from "../CountUps/CountUpStack";
// import { Avatar, Divider, Grid } from "@mui/material";
// import moment from "moment";
// import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import CakeIcon from "@mui/icons-material/Cake";
// import PlaceIcon from "@mui/icons-material/Place";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// export default function ViewProfileInfo() {
//   const [value, setValue] = useState(0);
//   const [profiles, setProfiles] = useState([]);
//   const [empoyeeInfo, setEmployeeInfo] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       setProfiles(await viewAllEmployees());
//     }
//     fetchData();
//   }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   console.log(profiles);
//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         bgcolor: "background.paper",
//         display: "flex",
//         height: 500,
//       }}
//     >
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         sx={{ borderRight: 1, borderColor: "divider" }}
//       >
//         {/* <Card sx={{background:"blue"}}>ddddd</Card> */}
//         {profiles &&
//           profiles.map((profile, i) => {
//             return (
//               <Tab
//                 label={
//                   profile.user.employeeFirstName +
//                   "  " +
//                   profile.user.employeeLastName
//                 }
//                 {...a11yProps(i)}
//               />
//             );
//           })}

//         {/* <Tab label="Kushan Madhushanka" {...a11yProps(1)} />
//         <Tab label="Item Three" {...a11yProps(2)} />
//         <Tab label="Item Four" {...a11yProps(3)} />
//         <Tab label="Item Five" {...a11yProps(4)} />
//         <Tab label="Item Six" {...a11yProps(5)} />
//         <Tab label="Item Seven" {...a11yProps(6)} /> */}
//       </Tabs>
//       {profiles &&
//         profiles.map((profile, i) => {
//           return (
//             <TabPanel value={value} index={i} component={"span"}>
//               <Box padding={3}>
//                 <Grid container>
//                   <Grid item md={4} component={"span"}>
//                     <Avatar
//                       src={profile.user.profilePic}
//                       sx={{ height: 150, width: 150 }}
//                     />

//                     <Grid container sx={{ mt: 2 }}>
//                       <Grid item md={12}>
//                         {profile.user.streetNo && (
//                           <Typography component={"span"}>
//                             <PlaceIcon />
//                             &nbsp;
//                             {profile.user.streetNo + " " + profile.user.city}
//                           </Typography>
//                         )}
//                       </Grid>
//                       <Grid item md={12} sx={{ mt: 1 }}>
//                         {profile.user.phoneNumber && (
//                           <Typography component={"span"}>
//                             <ContactPhoneIcon />
//                             &nbsp; {profile.user.phoneNumber}
//                           </Typography>
//                         )}
//                       </Grid>
//                       <Grid item md={12} sx={{ mt: 1 }}>
//                         <Typography>
//                           <ContactMailIcon />
//                           &nbsp;&nbsp;{profile.user.companyEmail}
//                         </Typography>
//                       </Grid>
//                       <Grid item md={12} sx={{ mt: 1 }}>
//                         <Typography>
//                           <CakeIcon />
//                           &nbsp;
//                           {new Date(profile.user.birthday).toDateString()}
//                         </Typography>
//                       </Grid>
//                       <Grid item md={12} sx={{ mt: 1 }}>
//                         <Typography>
//                           <PermIdentityIcon />
//                           &nbsp; {profile.user.NIC}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item md={8} sx={{ mt: 2 }}>
//                     <Typography variant="h6" component={"span"}>
//                       {/* {profile.user.jobRole.toUpperCase()+profile.user.jobRole.slice(1)} */}
//                       {profile.user.employeeFirstName.toUpperCase() +
//                         " " +
//                         profile.user.employeeLastName.toUpperCase() +
//                         " | " +
//                         profile.user.jobRole.toUpperCase()}
//                     </Typography>
//                   </Grid>

//                   <Grid item md={12}></Grid>
//                   <Grid item md={12}></Grid>
//                   <Grid item md={12}></Grid>
//                 </Grid>
//               </Box>
//             </TabPanel>
//           );
//         })}

//       {/* <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         Item Four
//       </TabPanel>
//       <TabPanel value={value} index={4}>
//         Item Five
//       </TabPanel>
//       <TabPanel value={value} index={5}>
//         Item Six
//       </TabPanel>
//       <TabPanel value={value} index={6}>
//         Item Seven
//       </TabPanel> */}
//     </Box>
//   );
// }
