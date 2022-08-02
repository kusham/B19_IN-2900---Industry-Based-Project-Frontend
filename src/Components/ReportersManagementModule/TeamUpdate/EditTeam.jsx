import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  Divider,
  FormLabel,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Box,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import TeamMemberDialog from "./TeamMemberDialog";
import { updateTeam } from "../../../Api/ReportersManagementModule/TeamsApi";
import { getEmployeesWithoutTeam } from "../../../Api/ReportersManagementModule/TeamsApi";
import { add } from "date-fns";
import useStyles from "./EditTeamStyles";

function EditTeam() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [duplicated, seDuplicated] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    teamName: "",
    teamLeader: "",
  });
  const [members, setMembers] = useState([]);
  const [updateField, setUpdateField] = useState(false);
  const [noChangeField, setNoChangeField] = useState(false);
  const location = useLocation();
  const { team } = location.state;
  const [editTeam, setEditTeam] = useState({
    teamName: team.teamName,

    teamMembers: team.TeamWithEmp.filter(
      (member) => member.employeeID !== team.teamLeadID
    ),

    teamLeader: team.TeamWithEmp.filter(
      (member) => member.employeeID === team.teamLeadID
    )[0],
  });

  const handleChange = (e) => {
    setEditTeam((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setUpdateField(true);
    setInputErrors({ ...inputErrors, [e.target.name]: "" });
  };

  const errorHandle = () => {
    let isError = false;

    if (!editTeam.teamName) {
      setInputErrors((prevState) => ({
        ...prevState,
        teamName: "Team Name is required",
      }));
      isError = true;
    }
    if (!editTeam.teamLeader) {
      setInputErrors((prevState) => ({
        ...prevState,
        teamLeader: "Team Leader is required",
      }));
      isError = true;
    }

    return isError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorHandle()) {
      const response = await updateTeam(editTeam, team._id);
      if (response.success === true && updateField) {
        setAddSuccessfully(true);
        setTimeout(() => {
          setAddSuccessfully(false);
        }, 2000);
      }
      if (!updateField) {
        setNoChangeField(true);
        setTimeout(() => {
          setNoChangeField(false);
        }, 2000);
      }
      if (response.success === false) {
        seDuplicated(true);
        setTimeout(() => {
          seDuplicated(false);
        }, 2000);
      }
    } else {
      setnotAdded(true);
      setTimeout(() => {
        setnotAdded(false);
      }, 2000);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setMembers(await getEmployeesWithoutTeam());
    }
    fetchData();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const classes = useStyles();
  return (
    <div>
      <Box padding={6} bgcolor="#d7dde0" mt={4}>
        <Paper sx={{ padding: 4, backgroundColor: "#e4ecf7", mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              sx={{ mb: 5, fontWeight: "bold", color: "#183d78" }}
            >
              <GroupAddIcon sx={{ width: 60, height: 60 }} />
              &nbsp; Update Team
            </Typography>
            <Divider sx={{ mb: 5, mt: 2 }}></Divider>
            <Grid container spacing={3}>
              <Grid item sm={12} md={6}>
                <Grid container sx={{ mb: 5 }}>
                  <Grid item sm={4} md={4}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Team Name:
                    </FormLabel>
                  </Grid>
                  <Grid item sm={8} md={8}>
                    {user.jobRole === "HR Manager" ? (
                      <TextField
                        id="filled-basic"
                        variant="filled"
                        name="teamName"
                        value={editTeam.teamName}
                        onChange={handleChange || add(this)}
                        error={inputErrors.teamName ? true : false}
                        helperText={inputErrors.teamName}
                        fullWidth
                      />
                    ) : (
                      <TextField
                        id="filled-basic"
                        variant="filled"
                        name="teamName"
                        disabled
                        value={editTeam.teamName}
                        onChange={handleChange || add(this)}
                        error={inputErrors.teamName ? true : false}
                        helperText={inputErrors.teamName}
                        fullWidth
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", alignItems: "center" }}>
                  <Grid item sm={4} md={4}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Team Members:
                    </FormLabel>
                  </Grid>

                  <Grid item sm={8} md={8}>
                    <IconButton onClick={handleOpenDialog}>
                      <EditIcon sx={{ color: "gray" }} fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
                <TeamMemberDialog
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  editTeam={editTeam}
                  setEditTeam={setEditTeam}
                  employees={members}
                  setEmployee={setMembers}
                  setUpdateField={setUpdateField}
                  updateField={updateField}
                />

                <Grid container sx={{ mb: 5 }}>
                  <Grid item sm={4} md={4}></Grid>
                  <Grid item sm={8} md={8}>
                    {editTeam.teamMembers.length > 0 &&
                      editTeam.teamMembers.map((member, i) => (
                        <Chip
                          label={member.employeeName}
                          key={member.employeeID}
                          sx={{
                            mr: 0.5,
                            mt: 1,
                            bgcolor: "rgba(49, 24, 62, 1)",
                            color: "white",
                            "& .MuiSvgIcon-root": {
                              color: "white",
                            },
                          }}
                        />
                      ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} md={6}>
                <Grid container>
                  <Grid item sm={4} md={4}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Team Lead :
                    </FormLabel>
                  </Grid>
                  <Grid item sm={8} md={8}>
                    {user.jobRole === "HR Manager" ? (
                      <TextField
                        id="data"
                        variant="filled"
                        name="teamLeader"
                        select
                        value={editTeam.teamLeader}
                        onChange={handleChange || add(this)}
                        error={inputErrors.teamLeader ? true : false}
                        helperText={inputErrors.teamLeader}
                        fullWidth
                        SelectProps={{
                          renderValue: (mem) => mem.employeeName,
                        }}
                      >
                        {members &&
                          members.map((mem) => (
                            <MenuItem value={mem} key={mem.employeeID}>
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <Grid item>
                                  <Avatar
                                    src={mem.profilePic}
                                    sx={{ height: 35, width: 35 }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography sx={{ mb: -0.7, ml: 1 }}>
                                    {mem.employeeName}
                                  </Typography>
                                  <Typography variant="body2" sx={{ ml: 1.3 }}>
                                    {mem.employeeID}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                      </TextField>
                    ) : (
                      <TextField
                        id="data"
                        variant="filled"
                        name="teamLeader"
                        select
                        disabled
                        value={editTeam.teamLeader}
                        onChange={handleChange || add(this)}
                        error={inputErrors.teamLeader ? true : false}
                        helperText={inputErrors.teamLeader}
                        fullWidth
                        SelectProps={{
                          renderValue: (mem) => mem.employeeName,
                        }}
                      >
                        {members &&
                          members.map((mem) => (
                            <MenuItem value={mem} key={mem.employeeID}>
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <Grid item>
                                  <Avatar
                                    src={mem.profilePic}
                                    sx={{ height: 35, width: 35 }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography sx={{ mb: -0.7, ml: 1 }}>
                                    {mem.employeeName}
                                  </Typography>
                                  <Typography variant="body2" sx={{ ml: 1.3 }}>
                                    {mem.employeeID}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} textAlign="left">
                {" "}
                <Button
                  component={Link}
                  to="/teams"
                  variant="contained"
                  sx={{ mt: 2 }}
                  className={classes.button}
                >
                  View Teams
                </Button>
              </Grid>
              <Grid item md={6} textAlign="right">
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  className={classes.button}
                  onClick={handleSubmit}
                >
                  Update Team
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {addSuccessfully ? (
          <Stack sx={{ width: "100%", height: 20, mt: 0.5 }} spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Team has been successfully added!
            </Alert>
          </Stack>
        ) : null}
        {notAdded ? (
          <Stack sx={{ width: "100%", mt: 0.5 }} spacing={2}>
            <Alert variant="filled" severity="error">
              Please enter all the details!
            </Alert>
          </Stack>
        ) : null}
        {duplicated ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Team details are duplicated!
            </Alert>
          </Stack>
        ) : null}
        {noChangeField ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="warning">
              No any change to update!
            </Alert>
          </Stack>
        ) : null}
      </Box>
    </div>
  );
}

export default EditTeam;
