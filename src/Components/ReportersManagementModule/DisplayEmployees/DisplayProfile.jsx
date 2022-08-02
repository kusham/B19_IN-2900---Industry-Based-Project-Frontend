import {
  Divider,
  Typography,
  Button,
  Avatar,
  Card,
  Grid,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import ProgressBar from "./ProgressBar";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import React, { useEffect, useState } from "react";
import { getAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";

function DisplayProfile({ employee }) {
  const jobRole = JSON.parse(sessionStorage.getItem("user")).jobRole;
  const [teams, setTeams] = useState();

  const { user, EmployeeWithAcc, EmpWithProf } = employee;

  useEffect(() => {
    async function fetchData() {
      setTeams(await getAllTeams());
    }
    fetchData();
  }, []);

  return (
    <div>
      <Card
        sx={{
          borderRadius: 5,
          marginBottom: 5,
          padding: 5,
          maxWidth: 750,
          minWidth: 750,
          minHeight: 570,
          cursor: "pointer",
          backgroundImage: `linear-gradient(to right, rgba(214, 243, 255), rgba(94, 204, 247))`,
          // backgroundColor: "#e4ecf7",
        }}
      >
        <Grid container>
          <Grid item md={9}>
            <Typography
              variant="h6"
              textAlign="left"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#183d78",
                fontFamily: "Kdam Thmor Pro",
              }}
            >
              {user &&
                user.employeeFirstName +
                  " " +
                  user.employeeLastName +
                  " | " +
                  user.jobRole}
            </Typography>
          </Grid>
          <Grid item md={3}>
            {teams &&
              user &&
              teams.map((team) => {
                if (team._id === user.teamID) {
                  return (
                    <Typography
                      variant="h6"
                      textAlign="center"
                      key={team._id}
                      sx={{ color: "#8385a8" }}
                    >
                      {team.teamName}
                    </Typography>
                  );
                }
              })}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} padding={1}>
            <Grid sx={{ justifyContent: "center", display: "flex" }}>
              <Avatar
                sx={{ width: 100, height: 100, border: "0.5px solid #1b529e" }}
                src={user.profilePic}
                alt={user.employeeFirstName + " " + user.employeeLastName}
              ></Avatar>
            </Grid>
            <Grid>
              <ProgressBar
                EmployeeWithAcc={EmployeeWithAcc}
                EmpWithProf={EmpWithProf}
                user={user}
              />
              <Typography
                textAlign="center"
                sx={{ fontWeight: "bold", color: "#183d78", mb: 1,fontStyle:"italic" }}
              >
                Completeness of the Profile
              </Typography>
            </Grid>
            {/* <Typography>{moment("lastSeen", "YYYYMMDD").fromNow()}</Typography> */}
            <Typography>
           Last Seen :   {moment(user.lastSeen).format("ddd MMM DD YYYY hh:mm:ss")}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Profile Info
            </Typography>
            <Grid>
              {user.streetNo && (
                <Typography>
                  <PlaceIcon sx={{ color: "#183d78" }} />
                  &nbsp; {user.streetNo + " " + user.city}
                </Typography>
              )}
              {user.phoneNumber && (
                <Typography>
                  <ContactPhoneIcon sx={{ color: "#183d78" }} />
                  &nbsp; {user.phoneNumber}
                </Typography>
              )}
              <Typography>
                <ContactMailIcon sx={{ color: "#183d78" }} />
                &nbsp;&nbsp;{user.companyEmail}
              </Typography>

              {jobRole === "HR Manager" &&(user.birthday && (
                <Typography>
                  <CakeIcon sx={{ color: "#183d78" }} />
                  &nbsp; {new Date(user.birthday).toDateString()}
                  {/* {momen{user.birthday).format("MMM DD YYYY")} */}
                </Typography>
              ))}
             {jobRole === "HR Manager" &&( <Typography>
                <PermIdentityIcon sx={{ color: "#183d78" }} />
                &nbsp;{user.NIC}
              </Typography>)}
            </Grid>
          </Grid>
          <Grid item md={6} padding={1}>
            <Divider sx={{ mt: 1, mb: 1 }}></Divider>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Job Type :&nbsp;
              </FormLabel>
              {user.jobType}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Status :&nbsp;
              </FormLabel>
              {user.status}
            </Typography>

            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Accademic Qulaifications
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                O/L Results :{" "}
              </FormLabel>

              {EmployeeWithAcc &&
                EmployeeWithAcc.ordinaryLevelResult.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <Grid cotainter>
                <Grid item md={5}></Grid>
                <Grid item md={7}></Grid>
              </Grid>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                A/L Results :&nbsp;
              </FormLabel>
              {EmployeeWithAcc &&
                EmployeeWithAcc.advancedLevelResults.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Achievements :&nbsp;
              </FormLabel>

              {EmployeeWithAcc &&
                EmployeeWithAcc.achievements.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Professional Qualifications
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                {" "}
                Degree : &nbsp;
              </FormLabel>
              {EmpWithProf &&
                EmpWithProf.degree.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Courses :&nbsp;
              </FormLabel>

              {EmpWithProf &&
                EmpWithProf.course.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                {" "}
                Languages :&nbsp;
              </FormLabel>

              {EmpWithProf &&
                EmpWithProf.language.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
          </Grid>
        </Grid>

       {jobRole === "HR Manager" &&( <Button
          component={Link}
          to={`/profile/update`}
          state={{ employee }}
          sx={{
            mt: 1,
            backgroundColor: "#183d78",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4d5575",
              color: "#fff",
            },
          }}
          fullWidth
          variant="contained"
          size="medium"
        >
          Update
        </Button>
  )}    </Card>
    </div>
  );
}

export default DisplayProfile;
