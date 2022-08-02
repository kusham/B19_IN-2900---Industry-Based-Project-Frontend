import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useLocation } from "react-router-dom";
import { Alert, AlertTitle, MenuItem, Typography } from "@mui/material";
import {
  resignStatus,
  updateEmployee,
} from "../../../Api/ReportersManagementModule/EmployeeApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { add } from "date-fns";
import useStyles from "./EditEmployeeStyles";

function EditEmployee() {
  const jobRole = JSON.parse(sessionStorage.getItem("user")).jobRole;
  const [inputErrors, setInputErrors] = useState({
    employeeFirstName: "",
    employeeLastName: "",
    NIC: "",
    companyEmail: "",
    status: "",
    jobRole: "",
    jobType: "",
    employeeID: "",
  });

  const location = useLocation();
  const { employee } = location.state;

  const [inputs, setInputs] = useState({
    employeeFirstName: employee.user.employeeFirstName,
    employeeLastName: employee.user.employeeLastName,
    streetNo: employee.user.streetNo ? employee.user.streetNo : "",
    phoneNumber: employee.user.phoneNumber ? employee.user.phoneNumber : "",
    companyEmail: employee.user.companyEmail,
    profilePic: employee.user.profilePic,
    NIC: employee.user.NIC ? employee.user.NIC : "",
    city: employee.user.city ? employee.user.city : "",
    birthday: new Date(employee.user.birthday)
      ? new Date(employee.user.birthday)
      : "",
    status: employee.user.status ? employee.user.status : "",
    employeeID: employee.user.employeeID ? employee.user.employeeID : "",
    jobRole: employee.user.jobRole ? employee.user.jobRole : "",
    jobType: employee.user.jobType ? employee.user.jobType : "",
    ordinaryLevelResult: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.ordinaryLevelResult
      : " ",
    advancedLevelResults: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.advancedLevelResults
      : " ",
    achievements: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.achievements
      : " ",
    degree: employee.EmpWithProf ? employee.EmpWithProf.degree : " ",
    language: employee.EmpWithProf ? employee.EmpWithProf.language : " ",
    course: employee.EmpWithProf ? employee.EmpWithProf.course : " ",
  });

  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [noChangeField, setNoChangeField] = useState(false);
  const [notUpdated, setNotUpdated] = useState(false);
  const [updateField, setUpdateField] = useState(false);
  const [notresigned, setNotresigned] = useState(false);

  const jobRoles = [
    "Software Engineer",
    "Senior Software Engineer",
    "HR Manager",
    "IT Employee",
    "CTO",
    "Associate Software Engineer",
    "Software Architect",
    "Tech Lead",
    "UI/UX Designer",
    "Business Analyst",
    "Intern",
    "Product Manager",
  ];
  const handleChange = async (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setUpdateField(true);
    setInputErrors({ ...inputErrors, [e.target.name]: "" });
  };

  //----------validation-----------------------------
  const errorHandle = () => {
    let isError = false;
    if (!inputs.employeeFirstName) {
      setInputErrors((prevState) => ({
        ...prevState,
        employeeFirstName: "Employee First Name is required",
      }));
      isError = true;
    }
    if (!inputs.employeeLastName) {
      setInputErrors((prevState) => ({
        ...prevState,
        employeeLastName: "Employee Last Name is required",
      }));
      isError = true;
    }
    if (!inputs.employeeID) {
      setInputErrors((prevState) => ({
        ...prevState,
        employeeID: "Employee ID is required",
      }));
      isError = true;
    }
    if (!inputs.status) {
      setInputErrors((prevState) => ({
        ...prevState,
        status: "Status is required",
      }));
      isError = true;
    }
    if (!inputs.jobType) {
      setInputErrors((prevState) => ({
        ...prevState,
        jobType: "Job Type is required",
      }));
      isError = true;
    }
    if (!inputs.jobRole) {
      setInputErrors((prevState) => ({
        ...prevState,
        jobRole: "Job Role is required",
      }));
      isError = true;
    }
    if (!inputs.NIC) {
      setInputErrors((prevState) => ({
        ...prevState,
        NIC: "NIC is required",
      }));
      isError = true;
    }
    if (!inputs.companyEmail) {
      setInputErrors((prevState) => ({
        ...prevState,
        companyEmail: "Email is required",
      }));
      isError = true;
    }
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (inputs.companyEmail && !inputs.companyEmail.match(emailFormat)) {
      setInputErrors((prevState) => ({
        ...prevState,
        companyEmail: "Invalid Email address",
      }));
      isError = true;
    }
    const phoneNumberFormat =
      "^(?:0|94|\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$";
    if (inputs.phoneNumber && !inputs.phoneNumber.match(phoneNumberFormat)) {
      setInputErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Invalid Phone Number",
      }));
      isError = true;
    }
    let NICformat = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
    if (inputs.NIC && !inputs.NIC.match(NICformat)) {
      setInputErrors((prevState) => ({
        ...prevState,
        NIC: "Invalid NIC Entered",
      }));
      isError = true;
    }
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empID = inputs.employeeID;
    console.log(empID);
    if (inputs.status === "Resigned") {
      const response = await resignStatus(empID);
      console.log(response);
      if (response.success === false) {
        console.log("error");
      }
      if (response.success === "true1") {
        setAddSuccessfully(true);
        setTimeout(() => {
          setAddSuccessfully(false);
        }, 2000);
      }
      if (response.success === true) {
        setNotresigned(true);
        setTimeout(() => {
          setNotresigned(false);
        }, 2000);
      }
    } else {
      if (!errorHandle()) {
        const response = await updateEmployee(inputs);
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

        if (response.status === 400) {
          setNotUpdated(true);
          setTimeout(() => {
            setNotUpdated(false);
          }, 2000);
        }
      } else {
        setnotAdded(true);
        setTimeout(() => {
          setnotAdded(false);
        }, 2000);
      }
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  const uploadProfilePhoto = (event) => {
    const fileType = ["image/png"];
    let selectedFile = event.target.files[0];

    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (event) => {
        setInputs({
          ...inputs,
          profilePic: event.target.result,
        });
      };
      setUpdateField(true);
    } else {
      console.log("Please select valid image file");
    }
  };

  const removeProfilePhoto = () => {
    if (!(employee.user.profilePic === " ")) {
      setInputs((prevState) => ({
        ...prevState,
        profilePic: " ",
      }));
      setUpdateField(true);
    }
  };
  const classes = useStyles();
  return (
    <div>
      {inputs && (
        <form>
          <Box padding={6} sx={{ mb: 4 }}>
            <Paper
              elevation={3}
              sx={{ padding: 4.5, backgroundColor: "#e4ecf7" }}
            >
              <Grid container>
                <Grid item sm={12} md={12} sx={{ color: "#183d78" }}>
                  <Typography variant="h5" fontWeight="bold">
                    <PersonIcon sx={{ width: 50, height: 50 }} />
                    USER PROFILE
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={inputs.profilePic}
                      sx={{
                        mt: 5,
                        mb: 5,
                        width: 150,
                        height: 150,
                        border: "0.5px solid #1b529e",
                      }}
                    />

                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/png"
                        id="icon-button-file"
                        type="file"
                        onChange={uploadProfilePhoto}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        sx={{ mt: 10 }}
                      >
                        <PhotoCamera
                          sx={{ width: 30, height: 30, color: "#183d78" }}
                        />
                      </IconButton>
                    </label>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={removeProfilePhoto} sx={{ mt: 10 }}>
                      <DeleteIcon
                        sx={{ width: 30, height: 30, color: "#183d78" }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={12}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            First Name :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" First Name "
                            variant="filled"
                            sx={{ backgroundColor: "#c7fcf7" }}
                            name="employeeFirstName"
                            value={inputs.employeeFirstName}
                            onChange={handleChange || add(this)}
                            error={inputErrors.employeeFirstName ? true : false}
                            helperText={inputErrors.employeeFirstName}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Last Name :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="  Last Name"
                            variant="filled"
                            name="employeeLastName"
                            sx={{ backgroundColor: "#c7fcf7" }}
                            value={inputs.employeeLastName}
                            onChange={handleChange || add(this)}
                            error={inputErrors.employeeLastName ? true : false}
                            helperText={inputErrors.employeeLastName}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Email :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Email"
                            variant="filled"
                            name="companyEmail"
                            sx={{ backgroundColor: "#c7fcf7" }}
                            value={inputs.companyEmail}
                            onChange={handleChange || add(this)}
                            error={inputErrors.companyEmail ? true : false}
                            helperText={inputErrors.companyEmail}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            NIC :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                         {jobRole === "HR Manager" ?( <TextField
                            id="filled-basic"
                            variant="filled"
                            name="NIC"
                            sx={{ backgroundColor: "#c7fcf7" }}
                            value={inputs.NIC}
                            onChange={handleChange || add(this)}
                            error={inputErrors.NIC ? true : false}
                            helperText={inputErrors.NIC}
                            fullWidth
                          />):(<TextField
                            id="filled-basic"
                            variant="filled"
                            name="NIC"
                            disabled
                            sx={{ backgroundColor: "#c7fcf7" }}
                            value={inputs.NIC}
                            onChange={handleChange || add(this)}
                            error={inputErrors.NIC ? true : false}
                            helperText={inputErrors.NIC}
                            fullWidth
                          />)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Phone :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Phone Number "
                            variant="filled"
                            name="phoneNumber"
                            value={inputs.phoneNumber}
                            onChange={handleChange || add(this)}
                            error={inputErrors.phoneNumber ? true : false}
                            helperText={inputErrors.phoneNumber}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Birthday :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <DatePicker
                                label="Birthday"
                                name="birthday"
                                inputFormat="dd/MM/yyyy"
                                value={inputs.birthday}
                                onChange={(newValue) => {
                                  setInputs({
                                    ...inputs,
                                    birthday: newValue,
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField variant="filled" {...params} />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Street No :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Street No"
                            variant="filled"
                            name="streetNo"
                            value={inputs.streetNo}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            City :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="City"
                            variant="filled"
                            name="city"
                            value={inputs.city}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR Manager" && (
                            <FormLabel
                              sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                              className="label"
                            >
                              Job Role :
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR Manager" && (
                            <TextField
                              id="data"
                              label="Job Role"
                              variant="filled"
                              name="jobRole"
                              select
                              sx={{ backgroundColor: "#c7fcf7" }}
                              value={inputs.jobRole}
                              onChange={handleChange || add(this)}
                              fullWidth
                              SelectProps={{
                                renderValue: (job) => job,
                              }}
                            >
                              {jobRoles.map((job) => (
                                <MenuItem value={job} key={job}>
                                  {job}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR Manager" && (
                            <FormLabel
                              sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                              className="label"
                            >
                              Job Type:
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR Manager" && (
                            <TextField
                              id="filled-basic"
                              label=" Job Type"
                              variant="filled"
                              name="jobType"
                              sx={{ backgroundColor: "#c7fcf7" }}
                              value={inputs.jobType}
                              onChange={handleChange || add(this)}
                              error={inputErrors.jobType ? true : false}
                              helperText={inputErrors.jobType}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR Manager" && (
                            <FormLabel
                              sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                              className="label"
                            >
                              Status :
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR Manager" && (
                            <TextField
                              id="filled-basic"
                              label="Status"
                              variant="filled"
                              name="status"
                              sx={{ backgroundColor: "#c7fcf7" }}
                              value={inputs.status}
                              onChange={handleChange || add(this)}
                              select
                              selectprops={{ renderValue: inputs.status }}
                              fullWidth
                            >
                              <MenuItem value={"Probationary"}>
                                Probationary
                              </MenuItem>
                              <MenuItem value={"Permenent"}>Permenent</MenuItem>
                              <MenuItem value={"Resigned"}>Resigned</MenuItem>
                            </TextField>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}></Grid>
                        <Grid item xs={6} md={9}></Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid></Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Degree :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Degree"
                            variant="filled"
                            name="degree"
                            value={inputs.degree || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Languages :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Languages"
                            variant="filled"
                            name="language"
                            value={inputs.language || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Courses :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Courses"
                            variant="filled"
                            name="course"
                            value={inputs.course || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}></Grid>
                    <Grid item sm={12} md={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            A/L Results :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" A,B,C"
                            variant="filled"
                            name="advancedLevelResults"
                            value={inputs.advancedLevelResults || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            Achievements :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Achievements"
                            variant="filled"
                            name="achievements"
                            value={inputs.achievements || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        marginBlockStart: "20px",
                        marginBlockEnd: "20px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel
                            sx={{ fontWeight: "bold", ml: 1, mt: 2 }}
                            className="label"
                          >
                            O/L Results :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="A,B,C"
                            variant="filled"
                            name="ordinaryLevelResult"
                            value={inputs.ordinaryLevelResult || " "}
                            onChange={handleChange || add(this)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={4}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      className={classes.button}
                      fullWidth
                    >
                      UPDATE
                    </Button>
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Button
                      LinkComponent={Link}
                      to={`/dashboard`}
                      state={{ allEmployees: true }}
                      variant="contained"
                      className={classes.button}
                      fullWidth
                    >
                      VIEW ALL EMPLOYEES
                    </Button>
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Button
                      LinkComponent={Link}
                      to={`/dashboard`}
                      state={{ allEmployees: true }}
                      variant="contained"
                      className={classes.button}
                      fullWidth
                    >
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {addSuccessfully ? (
              <Stack sx={{ width: "100%", mt: 0.5, height: 20 }} spacing={2}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Profile updated successfully added!
                </Alert>
              </Stack>
            ) : null}
            {notAdded ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  Please enter correct details!
                </Alert>
              </Stack>
            ) : null}
            {notUpdated ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  Profile is not updated!
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
            {notresigned ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="warning">
                  Risigning employee is not allowed, assets are not released
                  yet!
                </Alert>
              </Stack>
            ) : null}
          </Box>
        </form>
      )}
    </div>
  );
}

export default EditEmployee;
