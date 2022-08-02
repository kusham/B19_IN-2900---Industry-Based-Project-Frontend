import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { Multiselect } from "multiselect-react-dropdown";
import {
  Avatar,
  IconButton,
  Box,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import { Chip } from "@mui/material";
import {
  FormLabel,
  TextField,
  Divider,
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TeamMemberDialog from "./TeamMemberDialog";
import {
  createTeams,
  getEmployeesWithoutTeam,
} from "../../../Api/ReportersManagementModule/TeamsApi";
import { Link } from "react-router-dom";
import useStyles from "./CreateTeamStyles";

function CreateTeams() {
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [error, setError] = useState(false);

  const [teaminputs, setTeaminputs] = useState({
    teamName: "",
    teamLead: "",
    teamMembers: [],
  });
  const [teaminputErrors, setTeaminputErrors] = useState({
    teamName: "",
    teamLead: "",
  });

  const handleChange = (e) => {
    setTeaminputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setTeaminputErrors({ ...teaminputErrors, [e.target.name]: "" });
    if (e.target.name === "teamLead") {
      setMembers(leader.filter((lead) => lead !== e.target.value));
    }
  };

  const handleClear = () => {
    setTeaminputs({
      teamName: "",
      teamLead: {},
      teamMembers: [],
    });
  };
  //-----------validation--------------
  const errorHandle = () => {
    let isError = false;

    if (!teaminputs.teamName) {
      setTeaminputErrors((prevState) => ({
        ...prevState,
        teamName: "Team Name is required",
      }));
      isError = true;
    }

    if (!teaminputs.teamLead) {
      setTeaminputErrors((prevState) => ({
        ...prevState,
        teamLead: "Team Lead is required",
      }));
      isError = true;
    }

    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorHandle()) {
      const response = await createTeams(teaminputs);
      console.log(response);
      if (response.success === true) {
        setAddSuccessfully(true);
        setTimeout(() => {
          setAddSuccessfully(false);
        }, 2000);
        handleClear();
      }
      if (response.status === 400) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        handleClear();
      }
    } else {
      setnotAdded(true);
      setTimeout(() => {
        setnotAdded(false);
      }, 2000);
      handleClear();
     
    }
  };

  const [members, setMembers] = useState([]); //member
  const [leader, setLeader] = useState([]); //leader

  useEffect(() => {
    async function fetchData() {
      setMembers(await getEmployeesWithoutTeam());
      setLeader(await getEmployeesWithoutTeam());
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
      <Box padding={4}>
        <Paper sx={{ padding: 4, backgroundColor: "#c7cad1" }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              sx={{ mb: 5, fontWeight: "bold", color: "#183d78" }}
            >
              <GroupAddIcon sx={{ height: 40, width: 40 }} />
              &nbsp; Create Team
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
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      name="teamName"
                      value={teaminputs.teamName}
                      onChange={handleChange}
                      error={teaminputErrors.teamName ? true : false}
                      helperText={teaminputErrors.teamName}
                      fullWidth
                    />
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
                      <AddCircleIcon sx={{ color: "gray" }} fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
                <TeamMemberDialog
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  teaminputs={teaminputs}
                  setTeaminputs={setTeaminputs}
                  employees={members}
                  setEmployee={setMembers}
                />

                <Grid container sx={{ mb: 5 }}>
                  <Grid item sm={4} md={4}></Grid>
                  <Grid item sm={8} md={8}>
                    {teaminputs.teamMembers &&
                      teaminputs.teamMembers.map((member) => (
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
                    <TextField
                      id="data"
                      label="Team Leader"
                      variant="filled"
                      name="teamLead"
                      select
                      value={teaminputs.teamLead}
                      error={teaminputErrors.teamLead ? true : false}
                      helperText={teaminputErrors.teamLead}
                      onChange={handleChange}
                      fullWidth
                      SelectProps={{
                        renderValue: (mem) => mem.employeeName,
                      }}
                    >
                      {leader &&
                        leader.map((lead) => (
                          <MenuItem value={lead} key={lead.employeeID}>
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
                                  src={lead.profilePic}
                                  sx={{ height: 35, width: 35 }}
                                >
                                  {lead.employeeFirstName}
                                </Avatar>
                              </Grid>
                              <Grid item>
                                <Typography sx={{ mb: -0.7, ml: 1 }}>
                                  {lead.employeeName}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1.3 }}>
                                  {lead.employeeID}
                                </Typography>
                              </Grid>
                            </Grid>
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 2 }}>
              <Grid item md={6} sx={{ textAlign: "left" }}>
                <Button
                  component={Link}
                  to="/teams"
                  variant="contained"
                  className={classes.button}
                >
                  View Teams
                </Button>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  className={classes.button}
                >
                  Save New Team
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {addSuccessfully ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Team has been successfully added!
            </Alert>
          </Stack>
        ) : null}
        {error ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Team is not added!
            </Alert>
          </Stack>
        ) : null}
        {notAdded ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Please enter all the details!
            </Alert>
          </Stack>
        ) : null}
      </Box>
    </div>
  );
}

export default CreateTeams;
