import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Stack,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./CreateCandidateFormStyles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  createCandidate,
  updateCandidate,
} from "../../../Api/RecruitmentModule/CandidateApi";
import "@react-pdf-viewer/core/lib/styles/index.css";
import SnackBar from "../../SnackBar/SnackBar";
import ViewCandidateCV from "../ViewCandidateCV/ViewCandidateCV";

const jobPositions = [
  "Software engineer",
  "Business analyst",
  "HR Manager",
  "Chief technology officer (CTO)",
  "IT director",
  "IT manager",
  "IT coordinator",
  "UI/UX designer",
  "Product manager",
  "Associate Software engineer",
  "Intern",
  "Software Architect",
];

const CreateCandidateForm = ({
  candidateData,
  setCandidateData,
  candidateId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [candidateErrors, setCandidateErrors] = useState({
    firstName: "",
    lastName: "",
    NIC: "",
    appliedPosition: "",
    phoneNumber: "",
    email: "",
    cv: "",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleOnChange = (event) => {
    setCandidateData({
      ...candidateData,
      [event.target.name]: event.target.value,
    });
    setCandidateErrors({ ...candidateErrors, [event.target.name]: "" });
  };

  const handleClear = () => {
    setCandidateData({
      firstName: "",
      lastName: "",
      NIC: "",
      appliedPosition: "",
      phoneNumber: "",
      email: "",
      cv: "",
    });
  };

  const errorHandle = () => {
    let isError = false;
    Object.keys(candidateData).forEach((property) => {
      if (!candidateData[property]) {
        setCandidateErrors((prevState) => ({
          ...prevState,
          [property]: property + " is required!",
        }));
        isError = true;
      }
      return;
    });
    //eslint-disable-next-line
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (candidateData.email && !candidateData.email.match(emailFormat)) {
      setCandidateErrors((prevState) => ({
        ...prevState,
        email: "Invalid Email address",
      }));
      isError = true;
    }
    //eslint-disable-next-line
    const NICFormat = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
    if (candidateData.NIC && !candidateData.NIC.match(NICFormat)) {
      setCandidateErrors((prevState) => ({
        ...prevState,
        NIC: "Invalid NIC format",
      }));
      isError = true;
    }
    //eslint-disable-next-line
    const phoneFormat = /^\+947[125678][0-9]{7}$/;
    if (
      candidateData.phoneNumber &&
      !candidateData.phoneNumber.match(phoneFormat)
    ) {
      setCandidateErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Invalid phone number format",
      }));
      isError = true;
    }
    if (candidateErrors.cv) {
      isError = true;
    }
    const nameFormat = /^[a-zA-Z]*$/;
    if (candidateData.firstName && !candidateData.firstName.match(nameFormat)) {
      setCandidateErrors((prevState) => ({
        ...prevState,
        firstName: "Invalid name format",
      }));
      isError = true;
    }
    if (candidateData.lastName && !candidateData.lastName.match(nameFormat)) {
      setCandidateErrors((prevState) => ({
        ...prevState,
        lastName: "Invalid name format",
      }));
      isError = true;
    }
    return isError;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errorHandle()) {
      if (!candidateId) {
        const createResponse = await createCandidate(candidateData);
        if (createResponse.success === true) {
          setOpenSnackBar(true);
        } else {
          setErrorMessage(createResponse.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      } else {
        const updateResponse = await updateCandidate(
          candidateData,
          candidateId
        );
        if (updateResponse.success === true) {
          setOpenSnackBar(true);
        } 
      }
      handleClear();
      window.location.reload();
    }
  };
  const handlePDFUpload = (event) => {
    const fileType = ["application/pdf"];
    let selectedFile = event.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (event) => {
        setCandidateData({
          ...candidateData,
          cv: event.target.result,
        });
        setCandidateErrors({ ...candidateErrors, cv: "" });
      };
    } else {
      setCandidateErrors({
        ...candidateErrors,
        [event.target.name]: "Only pdf file type is allowed",
      });
    }
  };

  const classes = useStyles();
  return (
    <Box>
      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <PeopleAltIcon />
            <Typography variant="h4">
              {candidateId ? "Update" : "Create"} Candidate
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
                      <InputLabel>First Name</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Enter First Name"
                        variant="filled"
                        name="firstName"
                        value={candidateData.firstName}
                        error={candidateErrors.firstName ? true : false}
                        helperText={candidateErrors.firstName}
                        onChange={handleOnChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>NIC</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Enter valid NIC"
                        variant="filled"
                        name="NIC"
                        value={candidateData.NIC}
                        error={candidateErrors.NIC ? true : false}
                        helperText={candidateErrors.NIC}
                        onChange={handleOnChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Phone Number</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <MuiPhoneNumber
                        label="Enter Phone number"
                        defaultCountry={"lk"}
                        variant="filled"
                        name="phoneNumber"
                        value={candidateData.phoneNumber}
                        error={candidateErrors.phoneNumber ? true : false}
                        helperText={candidateErrors.phoneNumber}
                        fullWidth
                        onChange={(value) => {
                          setCandidateData({
                            ...candidateData,
                            phoneNumber: value,
                          });
                          setCandidateErrors({
                            ...candidateErrors,
                            phoneNumber: "",
                          });
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Applied Position</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Select Applied Position"
                        variant="filled"
                        name="appliedPosition"
                        select
                        value={candidateData.appliedPosition}
                        error={candidateErrors.appliedPosition ? true : false}
                        helperText={candidateErrors.appliedPosition}
                        onChange={handleOnChange}
                        fullWidth
                      >
                        {jobPositions.map((jobPosition) => (
                          <MenuItem value={jobPosition} key={jobPosition}>
                            {jobPosition}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Last Name</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Enter Last name"
                        variant="filled"
                        name="lastName"
                        value={candidateData.lastName}
                        error={candidateErrors.lastName ? true : false}
                        helperText={candidateErrors.lastName}
                        onChange={handleOnChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Email</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        label="Enter Valid Email"
                        variant="filled"
                        name="email"
                        value={candidateData.email}
                        error={candidateErrors.email ? true : false}
                        helperText={candidateErrors.email}
                        onChange={handleOnChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>CV</InputLabel>
                    </Grid>
                    <Grid item sm={8} md={8}>
                      <TextField
                        id="cv"
                        label="Upload Your CV"
                        variant="filled"
                        name="cv"
                        type={"file"}
                        error={candidateErrors.cv ? true : false}
                        helperText={candidateErrors.cv}
                        InputLabelProps={{ shrink: true }}
                        onChange={handlePDFUpload}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  color="inherit"
                  variant="contained"
                  size="large"
                  onClick={handleClear}
                  sx={{ mr: 1 }}
                >
                  Clear
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  {candidateId ? "Update" : "Create"}
                </Button>
              </Grid>
            </form>

            {candidateId && (
              <>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleOpenDialog}
                >
                  Old CV
                </Button>
                <ViewCandidateCV
                  openDialog={openDialog}
                  handleCloseDialog={handleCloseDialog}
                  candidateData={candidateData}
                />
              </>
            )}

            {errorMessage && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {errorMessage}
                </Alert>
              </Stack>
            )}
            <SnackBar
              handleCloseSnackBar={handleCloseSnackBar}
              openSnackBar={openSnackBar}
              message={
                candidateId
                  ? "Candidate successfully updated"
                  : "Candidate successfully created"
              }
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateCandidateForm;
