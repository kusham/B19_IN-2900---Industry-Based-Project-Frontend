import * as React from "react";
import { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginImg from "../Login/login.png";
import Select from '@mui/material/Select';
import { AlertTitle } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {
  createFirstEmployee
  } from "../../Api/Login/LoginApi";
  import axios from 'axios';
function Copyright(props) {
  
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.directfn.com/en/">
        DirectFN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Signup({ setUser, user }) {
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    employeeID: "",
    employeeFirstName: "",
    employeeLastName: "",
    jobRole: "",
    NIC: "",
    companyEmail: "",
  });
  const [inputs, setInputs] = useState({
    employeeID: "",
    employeeFirstName: "",
    employeeLastName: "",
    jobRole: "",
    NIC: "",
    companyEmail: "",
    candidateID:"temporyID", //this is used for only first time
  });
  useEffect(() => {
    axios.get("https://hr-and-assets-management.herokuapp.com/countEmployees/").then((res)=>{
      console.log(res.data.counts);
      if(res.data.counts!==0)
      {
        window.location.replace('/')
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }, []);
  const handleChanged = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClear = () => {
    setInputs({
      employeeID: "",
      employeeFirstName: "",
      employeeLastName: "",
      jobRole: "",
      NIC: "",
      companyEmail: "",
    });
  };
    //--------------validation-----------------------
    const errorHandle = () => {
        let isError = false;
        Object.keys(inputs).map((property) => {
          if (!inputs[property]) {
            setInputErrors((prevState) => ({
              ...prevState,
              [property]: property + " is required",
            }));
            isError = true;
          }
        });
        const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (inputs.companyEmail && !inputs.companyEmail.match(emailFormat)) {
          setInputErrors((prevState) => ({
            ...prevState,
            companyEmail: "Invalid Email address",
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
        if (!errorHandle()) {
          console.log(inputs)
          const response = await createFirstEmployee(inputs);
    
          if (response.success === true) {
            setAddSuccessfully(true);
            setTimeout(() => {
              setAddSuccessfully(false);
            }, 2000);
            console.log(response.user)
            setUser(response.user);
            window.location.replace("/dashboard");
            
            //----------------------------------------------------------------------------
          
          }
          handleClear();
        } else {
          handleClear();
          setnotAdded(true);
          setTimeout(() => {
            setnotAdded(false);
          }, 2000);
        }
      };
  return (
    <>
    {
      user? (
        <></>
      ):(
<Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.thesoftwarereport.com/wp-content/uploads/2020/08/Tech-company-IPO.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: -2, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <Typography component="h1" variant="h4">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 0 }}
            >
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="employeeID"
                  label="Employee ID"
                  name="employeeID"
                  onChange={handleChanged}
                  error={inputErrors.employeeID ? true : false}
                  autoComplete="employeeID"
                  autoFocus
                />
              </FormControl>
              <br />
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="NIC"
                  label="NIC"
                  name="NIC"
                  onChange={handleChanged}
                  error={inputErrors.NIC ? true : false}
                  autoComplete="NIC"
                  autoFocus
                />
              </FormControl>
              <br />
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="employeeFirstName"
                  label="First Name"
                  name="employeeFirstName"
                  onChange={handleChanged}
                  error={inputErrors.employeeFirstName ? true : false}
                  autoComplete="employeeFirstName"
                  autoFocus
                />
              </FormControl>
              <br />
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="employeeLastName"
                  label="Last Name"
                  name="employeeLastName"
                  onChange={handleChanged}
                  error={inputErrors.employeeLastName ? true : false}
                  autoComplete="employeeLastName"
                  autoFocus
                />
              </FormControl>
              <br />
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="companyEmail"
                  label="Company Email"
                  name="companyEmail"
                  onChange={handleChanged}
                  error={inputErrors.companyEmail ? true : false}
                  autoComplete="companyEmail"
                  autoFocus
                />
              </FormControl>
              <br />
              <FormControl variant="outlined" fullWidth required>
              <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputs.jobRole}
                    name="jobRole"
                    label="Job Role"
                    onChange={handleChanged}
                    error={inputErrors.jobRole ? true : false}
                    >
                    <MenuItem value="HR Manager">HR Manager</MenuItem>
                    </Select>
              </FormControl>
              <br />

              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
              </Grid>
                    {addSuccessfully && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Employee has been successfully added!
                    </Alert>
                    </Stack>
                )}
                    {notAdded && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert variant="filled" severity="error">
                        Please enter all the details!
                    </Alert>
                    </Stack>
                )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      )
    }
    </>
   
        
     
     
  );
}
