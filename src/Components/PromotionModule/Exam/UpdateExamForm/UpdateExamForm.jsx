import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { updateExamDetailsApi } from "../../../../Api/PromotionModule/ExamApi/updateExamDetailsApi";
import { viewAllPapersListApi } from "../../../../Api/PromotionModule/PaperApi/viewAllPapersListApi";
import { viewOneExamApi } from "../../../../Api/PromotionModule/ExamApi/viewOneExamApi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useStyles from "./UpdateExamFormStyles";

function UpdateExamForm({ user }) {
  const classes = useStyles();

  const [ExamName, setExamName] = useState("");
  const [DateScheduled, setDateScheduled] = useState("");
  const [JobRole, setJobRole] = useState("");
  const [PaperID, setPaperID] = useState("");
  const [organizerID, setOrganizerID] = useState("");
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [PaperList, setPaperList] = useState([]);
  const [Status, setStatus] = useState("");
  const [fill, setFill] = useState(false);
  const { EmployeeID } = useParams();
  const { ExamID } = useParams();

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole !== "HR Manager") {
      window.location.href = "/dashboard";
    }
  }
  useEffect(() => {
    async function fetchData() {
      setPaperList(await viewAllPapersListApi());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await viewOneExamApi(EmployeeID, ExamID);
      setExamName(result.ExamName, ExamName);
      setOrganizerID(result.organizerID, organizerID);
      setDateScheduled(result.DateScheduled, DateScheduled);
      setJobRole(result.JobRole, JobRole);
      setPaperID(result.PaperID, PaperID);
      setStatus(result.Status, Status);
    }
    fetchData();
  }, []);
  //console.log("paper fetched", record);

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    examName: "",
    dateScheduled: "",
    jobRole: "",
    paperID: "",
    status: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!ExamName) {
      setInputErrors((prevState) => ({
        ...prevState,
        examName: "Exam name is required",
      }));
      isError = true;
    }
    if (!DateScheduled) {
      setInputErrors((prevState) => ({
        ...prevState,
        dateScheduled: "Date scheduled filed is required",
      }));
      isError = true;
    }
    if (!JobRole) {
      setInputErrors((prevState) => ({
        ...prevState,
        jobRole: "Jobrole is required",
      }));
      isError = true;
    }
    if (!PaperID) {
      setInputErrors((prevState) => ({
        ...prevState,
        paperID: "Paper ID is required",
      }));
      isError = true;
    }
    if (!Status) {
      setInputErrors((prevState) => ({
        ...prevState,
        status: "Status is required",
      }));
      isError = true;
    }
    return isError;
  };
  //-----------------------------------------------------
  const sendData = async (e) => {
    e.preventDefault();

    const examDetails = {
      ExamID,
      ExamName,
      DateScheduled,
      JobRole,
      PaperID,
      Status,
    };
    //if (ExamID && ExamName && DateScheduled && JobRole && PaperID && Status) {
    if (!errorHandle()) {
      const response = await updateExamDetailsApi(
        EmployeeID,
        ExamID,
        examDetails
      );
      if (response.success === true) {
        setadded(true);
        setTimeout(() => {
          setadded(false);
        }, 2000);
      } else {
        seterror(true);
        setTimeout(() => {
          seterror(false);
        }, 2000);
      }
    } else {
      setFill(true);
      setTimeout(() => {
        setFill(false);
      }, 4000);
    }
  };

  return (
    <Box className={classes.Box}>
      <Grid item sm={12} md={12} className={classes.createButton}>
        <Button
          className={classes.Button}
          variant="contained"
          size="large"
          onClick={() =>
            window.open(
              ` /promotion/evaluation/exam/viewExam/${EmployeeID}`,
              "_self"
            )
          }
        >
          View All Evaluation Exams
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <EventNoteRoundedIcon />
            <Typography variant="h4">Update Exam</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={sendData}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Exam ID</InputLabel>
                    </Grid>
                    <TextField
                      label="ID"
                      variant="outlined"
                      disabled={true}
                      name="ExamID"
                      value={ExamID}
                      fullWidth
                    />
                  </Grid>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Organizer ID</InputLabel>
                    </Grid>
                    <TextField
                      label="ID"
                      variant="outlined"
                      disabled={true}
                      name="organizerID"
                      value={organizerID}
                      fullWidth
                    />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Job Role</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Job Role
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={JobRole}
                        error={inputErrors.jobRole ? true : false}
                        label="Job Role"
                        onChange={(e) => {
                          setJobRole(e.target.value);
                        }}
                      >
                        {/* <MenuItem value="SE">SE</MenuItem>
                        <MenuItem value="BA">BA</MenuItem>
                        <MenuItem value="QA">QA</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="SSE">SSE</MenuItem> */}
                        <MenuItem value="Software Engineer">
                          Software Engineer
                        </MenuItem>
                        <MenuItem value="Senior Software Engineer">
                          Senior Software Engineer
                        </MenuItem>
                        <MenuItem value="HR Manager">HR Manager</MenuItem>
                        <MenuItem value="Associate Software Engineer">
                          Associate Software Engineer
                        </MenuItem>
                        <MenuItem value="Software Architect">
                          Software Architect
                        </MenuItem>
                        <MenuItem value="Tech Lead">Tech Lead</MenuItem>
                        <MenuItem value="UI/UX Designer">
                          UI/UX Designer
                        </MenuItem>
                        <MenuItem value="Business Analyst">
                          Business Analyst
                        </MenuItem>
                        <MenuItem value="Product Manager">
                          Product Manager
                        </MenuItem>
                      </Select>
                      <FormHelperText style={{ color: "#cf0028" }}>
                        {inputErrors.jobRole}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Date Scheduled</InputLabel>
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Schedule date"
                        variant="outlined"
                        value={DateScheduled}
                        disablePast
                        onChange={(date) => {
                          //setDateScheduled(date);
                          setDateScheduled(date.toLocaleDateString("IST"));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={inputErrors.dateScheduled}
                            error={inputErrors.dateScheduled ? true : false}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {/* value.format("YYYY-MM-DD HH:mm:ss"), "Asia/Singapore" */}
                  </Grid>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Exam Name</InputLabel>
                    </Grid>
                    <TextField
                      label="Exam Name"
                      variant="outlined"
                      name="ExamName"
                      value={ExamName}
                      helperText={inputErrors.examName}
                      error={inputErrors.examName ? true : false}
                      onChange={(e) => {
                        setExamName(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Exam Status</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Exam Status
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={Status}
                        error={inputErrors.status ? true : false}
                        label="Exam Status"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <MenuItem
                          value="Completed"
                          sx={{ backgroundColor: "#ffc1e3" }}
                        >
                          Completed
                        </MenuItem>
                        <MenuItem
                          value="Pending"
                          sx={{ backgroundColor: "##9162e4" }}
                        >
                          Pending
                        </MenuItem>
                      </Select>
                      <FormHelperText style={{ color: "#cf0028" }}>
                        {inputErrors.status}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper ID</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        PaperID
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={PaperID}
                        error={inputErrors.paperID ? true : false}
                        label="PaperID"
                        onChange={(e) => {
                          setPaperID(e.target.value);
                        }}
                      >
                        {PaperList.map((option, key) => (
                          <MenuItem value={option.PaperID} key={key}>
                            {option.PaperID} ({option.PaperName})
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText style={{ color: "#cf0028" }}>
                        {inputErrors.paperID}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  className={classes.Button}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {added ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Exam is successfully updated!
          </Alert>{" "}
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter all the details!
          </Alert>
        </Stack>
      ) : null}
      {fill ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="warning">
            Please enter all the details or Check them again!
          </Alert>
        </Stack>
      ) : null}
    </Box>
  );
}

export default UpdateExamForm;
