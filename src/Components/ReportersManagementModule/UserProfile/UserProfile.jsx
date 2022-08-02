import { React, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SchoolIcon from "@mui/icons-material/School";
import CakeIcon from "@mui/icons-material/Cake";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import { viewAllEmployees } from "../../../Api/ReportersManagementModule/EmployeeApi";
import moment from "moment";
import ProgressBar from "../DisplayEmployees/ProgressBar";
import useStyles from "./UserProfileStyles";

function UserProfile({ user }) {
  const [profiles, setProfiles] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState([]);

  useEffect(() => {
    let userInfo = [];
    async function fetchData() {
      userInfo = await viewAllEmployees();
      setProfiles(userInfo);
      setEmployeeInfo(
        userInfo.filter((emp) => emp.user.employeeID === user.employeeID)
      );
    }
    fetchData();
  }, []);
  let employee = { ...employeeInfo[0] };
  const classes = useStyles();
  return (
    <div>
      {employee && (
        <Box
          sx={{ width: "100%", backgroundColor: "#d7dde0", padding: 8, mt: 5 }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={3} textAlign="left">
                  <Button
                    component={Link}
                    to={`/user/update`}
                    state={{ employee }}
                    variant="contained"
                    className={classes.button}
                  >
                    <EditIcon />
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.profilePic}
                    sx={{
                      width: 120,
                      height: 120,
                      mt: 5,
                      border: "0.5px solid #183d78",
                    }}
                  />
                </Grid>
              </Grid>

              <ProgressBar
                EmpWithProf={employeeInfo[0] && employeeInfo[0].EmpWithProf}
                EmployeeWithAcc={
                  employeeInfo[0] && employeeInfo[0].EmployeeWithAcc
                }
                user={employeeInfo[0] && employeeInfo[0].user}
              />
              <Typography
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#708bb8",
                }}
              >
                Completeness of Profile
              </Typography>
              <Card sx={{ padding: 3, mt: 2 }} className={classes.card}>
                <Typography variant="h6" sx={{ color: "#708bb8" }}>
                  <AccountCircleIcon />
                  &nbsp;Profile Info
                </Typography>
                <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                {employeeInfo[0] &&
                  employeeInfo[0].user &&
                  employeeInfo[0].user.streetNo && (
                    <Typography>
                      <PlaceIcon sx={{ color: "#183d78" }} />
                      &nbsp;
                      {employeeInfo[0].user.streetNo} &nbsp;&nbsp;
                      {employeeInfo[0] &&
                        employeeInfo[0].user &&
                        employeeInfo[0].user.city}
                    </Typography>
                  )}
                {employeeInfo[0] &&
                  employeeInfo[0].user &&
                  employeeInfo[0].user.companyEmail && (
                    <Typography sx={{ mb: 1 }}>
                      <ContactMailIcon sx={{ color: "#183d78" }} />
                      &nbsp;&nbsp;
                      {employeeInfo[0].user.companyEmail}
                    </Typography>
                  )}
                {employeeInfo[0] &&
                  employeeInfo[0].user &&
                  employeeInfo[0].user.phoneNumber && (
                    <Typography sx={{ mb: 1 }}>
                      <ContactPhoneIcon sx={{ color: "#183d78" }} />
                      &nbsp;&nbsp;
                      {employeeInfo[0].user.phoneNumber}
                    </Typography>
                  )}
                {employeeInfo[0] &&
                  employeeInfo[0].user &&
                  employeeInfo[0].user.birthday && (
                    <Typography sx={{ mb: 1 }}>
                      <CakeIcon sx={{ color: "#183d78" }} />
                      &nbsp;
                      {moment(employeeInfo[0].user.birthday).format(
                        "MMM DD YYYY"
                      )}
                    </Typography>
                  )}
                <Divider sx={{ mt: 1, mb: 1 }}></Divider>

                <Typography
                  sx={{ mb: 1, color: "#183d78", fontWeight: "bold" }}
                >
                  {employeeInfo[0] &&
                    employeeInfo[0].user &&
                    employeeInfo[0].user.jobType}
                  &nbsp;|&nbsp;
                  {employeeInfo[0] &&
                    employeeInfo[0].user &&
                    employeeInfo[0].user.status}
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={8} sx={{ mt: 1 }}>
              <Typography
                variant="h4"
                sx={{ mb: 2, fontWeight: "bold", color: "#183d78" }}
              >
                {user.employeeFirstName + " " + user.employeeLastName}|{" "}
                {user.jobRole}
              </Typography>
              <Card sx={{ padding: 3 }} className={classes.card}>
                <Typography variant="h6" sx={{ color: "#708bb8" }}>
                  <SchoolIcon />
                  &nbsp;Professional Qualification
                </Typography>
                <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      Courses
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmpWithProf &&
                      employeeInfo[0].EmpWithProf.course.map((result, i) => {
                        return <Typography key={i}>{result}</Typography>;
                      })}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      Degrees
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmpWithProf &&
                      employeeInfo[0].EmpWithProf.degree.map((result, i) => {
                        return <Typography key={i}>{result}</Typography>;
                      })}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      Languages
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmpWithProf &&
                      employeeInfo[0].EmpWithProf.language.map((result, i) => {
                        return <Typography key={i}>{result}</Typography>;
                      })}
                  </Grid>
                </Grid>
              </Card>
              <Card sx={{ padding: 3, mt: 2 }} className={classes.card}>
                <Typography variant="h6" sx={{ color: "#708bb8" }}>
                  <MenuBookIcon />
                  &nbsp;Academic Qualification
                </Typography>
                <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      O/L Results
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmployeeWithAcc &&
                      employeeInfo[0].EmployeeWithAcc.ordinaryLevelResult.map(
                        (result, i) => {
                          return <Typography key={i}>{result}</Typography>;
                        }
                      )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      A/L Results
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmployeeWithAcc &&
                      employeeInfo[0].EmployeeWithAcc.advancedLevelResults.map(
                        (result, i) => {
                          return <Typography key={i}>{result}</Typography>;
                        }
                      )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold", color: "#9da1a6" }}>
                      Achievments
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    {employeeInfo.length > 0 &&
                      employeeInfo[0].EmployeeWithAcc &&
                      employeeInfo[0].EmployeeWithAcc.achievements.map(
                        (result, i) => {
                          return <Typography key={i}>{result}</Typography>;
                        }
                      )}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default UserProfile;
