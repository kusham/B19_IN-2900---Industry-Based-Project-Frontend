import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  InputLabel,
  Avatar,
  Chip,
} from "@mui/material";
import useStyles from "./CreateInterviewStyles";
import { AddCircle, Edit } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InterviewerDialog from "./InterviewerDialog/InterviewerDialog";
import { fetchCandidates } from "../../../Api/RecruitmentModule/CandidateApi";
import {
  createInterview,
  fetchEmployees,
  updateInterview,
} from "../../../Api/RecruitmentModule/InterviewApi";
import { useLocation, useNavigate } from "react-router-dom";

const CreateInterviewForm = () => {
  const [interview, setInterview] = useState({
    candidate: "",
    InterviewType: "",
    InterviewDate: "",
    InterviewTime: "",
    Interviewers: [],
  });
  const [interviewErrors, setInterviewErrors] = useState({
    candidate: "",
    InterviewType: "",
    InterviewDate: "",
    InterviewTime: "",
    Interviewers: "",
  });
  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [interviewID, setInterviewID] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const fetchData = async () => {
    setCandidates(await fetchCandidates());
    setEmployees(await fetchEmployees());
  };

  useEffect(() => {
    fetchData();
    if (location.state) {
      const updateInterview = location.state.interview;
      setInterview({
        candidateName: updateInterview.candidate.candidateName,
        candidateID: updateInterview.candidateID,
        InterviewType: updateInterview.InterviewType,
        InterviewDate: updateInterview.InterviewDate,
        InterviewTime: updateInterview.InterviewDate,
        Interviewers: updateInterview.Interviewers,
      });
      setInterviewID(location.state.interview._id);
    }
  }, [location.state]);
 
  const errorHandle = () => {
    let isError = false;
    Object.keys(interview).forEach((property) => {
      if (!interview[property] || interview[property].length === 0) {
        setInterviewErrors((prevState) => ({
          ...prevState,
          [property]: property + " is required!",
        }));
        isError = true;
      }
      return;
    });
    return isError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errorHandle()) {
      var response = null;
      console.log("first")
      if (interviewID) {
        response = await updateInterview(interview, interviewID);
      } else {
        response = await createInterview(interview, interviewErrors);
      }
      clearForm();
      navigate("/interview", { state: response });
    }
  };
  const clearForm = () => {
    setInterview({
      candidate: "",
      candidateName: "",
      InterviewType: "",
      InterviewDate: new Date(),
      InterviewTime: new Date(),
      Interviewers: [],
    });
  };

  const handleOnChange = (event) => {
    setInterview({ ...interview, [event.target.name]: event.target.value });
    setInterviewErrors({ ...interviewErrors, [event.target.name]: "" });
  };

  const handleInterviewerClick = () => {
    setOpenDialog(true);
  };

  return (
    <Box>
      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <PeopleAltIcon />
            <Typography variant="h4">
              {interviewID ? "Update " : "Create "}Interview
            </Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Candidate</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      {interviewID ? (
                        <TextField
                          label="Candidate"
                          variant="filled"
                          name="candidate"
                          value={interview.candidateName}
                          fullWidth
                          disabled
                        />
                      ) : (
                        <TextField
                          label="Candidate"
                          variant="filled"
                          name="candidate"
                          select
                          error={interviewErrors.candidate ? true : false}
                          helperText={interviewErrors.candidate}
                          value={interview.candidate}
                          onChange={handleOnChange}
                          fullWidth
                          SelectProps={{
                            renderValue: (candidate) => candidate.candidateName,
                          }}
                        >
                          {candidates &&
                            candidates.map((candidate) => (
                              <MenuItem value={candidate} key={candidate._id}>
                                <Grid container className={classes.menuItem}>
                                  <Grid item>
                                    <Avatar sx={{ height: 35, width: 35 }}>
                                      {candidate.candidateName[0].toUpperCase()}
                                    </Avatar>
                                  </Grid>
                                  <Grid item>
                                    <Typography sx={{ mb: -0.7, ml: 1 }}>
                                      {candidate.candidateName}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ ml: 1.3 }}
                                    >
                                      {candidate.NIC}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Interview Type</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Select Interview Type"
                        select
                        error={interviewErrors.InterviewType ? true : false}
                        helperText={interviewErrors.InterviewType}
                        variant="filled"
                        name="InterviewType"
                        value={interview.InterviewType}
                        onChange={handleOnChange}
                        fullWidth
                      >
                        <MenuItem value={"HR"}>HR Interview</MenuItem>
                        <MenuItem value={"Technical"}>
                          Technical Interview
                        </MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Interviewers</InputLabel>
                    </Grid>
                    <Grid
                      item
                      sm={8}
                      md={8}
                      className={classes.interviewerIcons}
                    >
                      <Grid container>
                        <Grid item md={12}>
                          <IconButton onClick={handleInterviewerClick}>
                            <AddCircle fontSize="large" />
                          </IconButton>
                          <IconButton
                            disabled={
                              interview.Interviewers.length === 0 ? true : false
                            }
                            onClick={handleInterviewerClick}
                          >
                            <Edit fontSize="large" />
                          </IconButton>
                        </Grid>
                        <Grid item md={12}>
                          <Typography
                            fontSize="0.75rem"
                            sx={{ ml: 4, letterSpacing: "0.03333em" }}
                            color="error"
                          >
                            {interviewErrors.Interviewers}
                          </Typography>
                        </Grid>
                      </Grid>

                      <InterviewerDialog
                        setOpenDialog={setOpenDialog}
                        openDialog={openDialog}
                        setInterview={setInterview}
                        interview={interview}
                        employees={employees}
                        setEmployees={setEmployees}
                        setInterviewErrors={setInterviewErrors}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item sm={4} md={4}></Grid>
                    <Grid item sm={8} md={8}>
                      {interview.Interviewers &&
                        interview.Interviewers.map((interviewer) => (
                          <Chip
                            label={
                              interviewer.employeeName ||
                              interviewer.employeeFirstName +
                                " " +
                                interviewer.employeeLastName
                            }
                            key={interviewer.employeeID}
                            className={classes.chip}
                          />
                        ))}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Interview Date</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DatePicker
                            label="Select Interview Date"
                            name="InterviewDate"
                            inputFormat="MM/dd/yyyy"
                           
                            value={interview.InterviewDate}
                            onChange={(newValue) => {
                              setInterview({
                                ...interview,
                                InterviewDate: newValue,
                              });
                              setInterviewErrors({
                                ...interviewErrors,
                                InterviewDate: "",
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="filled"
                                {...params}
                                error={
                                  interviewErrors.InterviewDate ? true : false
                                }
                                helperText={interviewErrors.InterviewDate}
                              />
                            )}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Interview Time</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Select Interview Time"
                            name="InterviewTime"
                            value={interview.InterviewTime}
                            
                            onChange={(newValue) => {
                              setInterview({
                                ...interview,
                                InterviewTime: newValue,
                              });
                              setInterviewErrors({
                                ...interviewErrors,
                                InterviewTime: "",
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="filled"
                                {...params}
                                error={
                                  interviewErrors.InterviewTime ? true : false
                                }
                                helperText={interviewErrors.InterviewTime}
                              />
                            )}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  {interviewID ? "Update" : "Create"}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateInterviewForm;
