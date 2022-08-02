// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { scheduleExamApi } from "../../../Api/PromotionModule/ExamApi/scheduleExamApi";

// const ScheduleExamForm = () => {
//   const [Exam, setExam] = useState([]);
//   const { EmployeeID } = useParams();
//   useEffect(() => {
//     async function fetchData() {
//       setExam(await scheduleExamApi(EmployeeID, Exam));
//     }
//     fetchData();
//   }, []);
//   console.log(Exam);
//   return <div>from schedule exam</div>;
// };
// export default ScheduleExamForm;

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
import { useParams } from "react-router-dom";
import { scheduleExamApi } from "../../../../Api/PromotionModule/ExamApi/scheduleExamApi";
import { viewAllPapersListApi } from "../../../../Api/PromotionModule/PaperApi/viewAllPapersListApi";
import { viewAllExamsApi } from "../../../../Api/PromotionModule/ExamApi/viewAllExamsApi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useStyles from "./ScheduleExamFormStyles";

function ScheduleExamForm({user}) {
  const classes = useStyles();

  const [ExamName, setExamName] = useState("");
  const [DateScheduled, setDateScheduled] = useState(null);
  const [JobRole, setJobRole] = useState("");
  const [PaperID, setPaperID] = useState("");
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [Status, setStatus] = useState([]);
  const [fill, setFill] = useState(false);
  const [ExamsList, setExamsList] = useState([]);
  const [ExamID, setExamID] = useState("");
  const [PaperList, setPaperList] = useState([]);

  const { EmployeeID } = useParams();

  if(!user)
  {
    window.location.replace('/');
  }else{
    if(user.jobRole !== "HR Manager")
    {
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
      setExamsList(await viewAllExamsApi());
    }
    fetchData();
  }, []);

  const jobRoles = [
    "Software Engineer",
    "Senior Software Engineer",
    "HR Manager",
    "Associate Software Engineer",
    "Software Architect",
    "Tech Lead",
    "UI/UX Designer",
    "Business Analyst",
    "Product Manager",
  ];

  const examsCompleted = ExamsList.filter((q1) => q1.Status === "Pending");
  const listJobRoles = jobRoles.filter(
    (q1) => !examsCompleted.find((q2) => q1 === q2.JobRole)
  );

  //console.log("examsCompleted", examsCompleted);
  //console.log("listJobRoles", listJobRoles);

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    examID: "",
    examName: "",
    dateScheduled: "",
    jobRole: "",
    paperID: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!ExamID) {
      setInputErrors((prevState) => ({
        ...prevState,
        examID: "Exam ID is required",
      }));
      isError = true;
    }
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

    return isError;
  };
  //-----------------------------------------------------

  const sendData = async (e) => {
    e.preventDefault();
    //ExamID, ExamName, DateScheduled, JobRole, PaperID

    const examDetails = {
      ExamID,
      ExamName,
      DateScheduled,
      JobRole,
      PaperID,
      Status,
    };
    console.log(examDetails);
    // if (ExamID && ExamName && DateScheduled && JobRole && PaperID && Status) {
    if (!errorHandle()) {
      const response = await scheduleExamApi(EmployeeID, examDetails);
      window.location.reload(false);
      if (response.success === true) {
        setExamID("");
        setExamName("");
        setDateScheduled("");
        setJobRole("");
        setPaperID("");
        setStatus("");
        setadded(true);
        setTimeout(() => {
          setadded(false);
        }, 4000);
      } else {
        seterror(true);
        setTimeout(() => {
          seterror(false);
        }, 4000);
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
            <Typography variant="h4">Schedule New Exam</Typography>
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
                      label="Exam-ABC-000XX"
                      variant="outlined"
                      name="ExamID"
                      value={ExamID}
                      helperText={inputErrors.examID}
                      error={inputErrors.examID ? true : false}
                      onChange={(e) => {
                        setExamID(e.target.value);
                      }}
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
                        label="Job Role"
                        error={inputErrors.jobRole ? true : false}
                        onChange={(e) => {
                          setJobRole(e.target.value);
                        }}
                      >
                        {listJobRoles.map((role, key) => (
                          <MenuItem value={role} key={key}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText style={{ color: "#cf0028" }}>
                        {inputErrors.jobRole}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
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
                        label="PaperID"
                        error={inputErrors.paperID ? true : false}
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

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Date Scheduled</InputLabel>
                    </Grid>
                    {/* <TextField
                      label="Date Scheduled"
                      
                      name="DateScheduled"
                      value={DateScheduled}
                      onChange={(e) => {
                        setDateScheduled(e.target.value);
                      }}
                      fullWidth
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Schedule date"
                        variant="outlined"
                        value={DateScheduled}
                        disablePast
                        //helperText={inputErrors.dateScheduled}
                        //error={inputErrors.dateScheduled ? true : false}
                        onChange={(date) => {
                          //DateScheduled.toLocaleString('IST', { timeZone: 'Asia/Kolkata' })
                          //toLocaleDateString
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
                      {/* <FormHelperText style={{ color: "red" }}>
                        {inputErrors.dateScheduled}
                      </FormHelperText> */}
                    </LocalizationProvider>
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
                    <TextField
                      label="Exam Status"
                      variant="outlined"
                      name="ExamName"
                      value="Pending"
                      disabled
                      fullWidth
                    />
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
                  Schedule
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {added ? (
        <Stack sx={{ marginLeft: "2%", width: "85%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The new Exam is successfully scheduled!
          </Alert>
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ marginLeft: "2%", width: "85%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter all the details!
          </Alert>
        </Stack>
      ) : null}
      {fill ? (
        <Stack
          className={classes.dialog}
          sx={{ marginLeft: "2%", width: "85%", paddingTop: false }}
          spacing={2}
        >
          <Alert variant="filled" severity="warning">
            Please enter all the details or Check them again!
          </Alert>
        </Stack>
      ) : null}
    </Box>
  );
}

export default ScheduleExamForm;
