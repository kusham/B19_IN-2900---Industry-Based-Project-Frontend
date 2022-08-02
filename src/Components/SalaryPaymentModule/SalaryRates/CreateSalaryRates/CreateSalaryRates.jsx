import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { createSalaryPercentagesApi } from "../../../../Api/SalaryPaymentModule/SalaryRatesApi/createSalaryPercentagesApi";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Stack from "@mui/material/Stack";
import useStyles from "./CreateSalaryRatesStyles";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CreateSalaryRates({ user }) {
  const { EmployeeID } = useParams();
  const classes = useStyles();
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [fill, setFill] = useState(false);

  if (!user) {
    window.location.replace("/");
  } else if (user.jobRole !== "HR Manager") {
    window.location.href = "/dashboard";
  }
  const [rates, setRates] = useState({
    EmoloyeeEpfRate: "",
    CompanyEPFRate: "",
    ETFRate: "",
  });
  console.log(rates);

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    emoloyeeEpfRate: "",
    companyEPFRate: "",
    eTFRate: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!rates.EmoloyeeEpfRate) {
      setInputErrors((prevState) => ({
        ...prevState,
        emoloyeeEpfRate: "EmployeeEpfRate field is required",
      }));
      isError = true;
    }

    if (!rates.CompanyEPFRate) {
      setInputErrors((prevState) => ({
        ...prevState,
        companyEPFRate: "CompanyEPFRate field is required",
      }));
      isError = true;
    }
    if (!rates.ETFRate) {
      setInputErrors((prevState) => ({
        ...prevState,
        eTFRate: "ETFRate field is required",
      }));
      isError = true;
    }

    if (rates.EmoloyeeEpfRate >= 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        emoloyeeEpfRate: "Value should be less than 0",
      }));
      isError = true;
    }
    if (rates.CompanyEPFRate >= 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        companyEPFRate: "Value should be less than 0",
      }));
      isError = true;
    }
    if (rates.ETFRate >= 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        eTFRate: "Value should be less than 0",
      }));
      isError = true;
    }
    return isError;
  };
  //-----------------------------------------------------

  const CreateSalaryRatesFunc = async (e) => {
    console.log("CreateSalaryRatesFunc");
    e.preventDefault();
    // if (rates.EmoloyeeEpfRate && rates.ETFRate && rates.CompanyEPFRate) {
    if (!errorHandle()) {
      const response = await createSalaryPercentagesApi(EmployeeID, rates);
      //
      if (response.success === true) {
        console.log("success");
        setadded(true);
        setTimeout(() => {
          setadded(false);
          window.location.reload(false);
        }, 4000);
      } else {
        console.log("error");
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
          className={classes.button}
          variant="contained"
          size="large"
          component={Link}
          to={`/salary/salaryPercentages/${EmployeeID}`}
          // onClick={() =>
          //   window.open(`/salary/salaryPercentages/${EmployeeID}`, "_self")
          // }
        >
          View Salary Rates
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={6} md={12} className={classes.formHeader}>
            <MonetizationOnOutlinedIcon />
            <Typography variant="h4">New Salary Rates</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={CreateSalaryRatesFunc}>
              <Grid container>
                <Grid item sm={12} md={12} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={6} md={6} className={classes.texFieldLabel}>
                      <InputLabel>Emoloyee EPF Rate</InputLabel>
                    </Grid>
                    <TextField
                      label="Emoloyee EPF Rate"
                      //variant="outlined"
                      id="filled-basic"
                      variant="filled"
                      name="BasicSalary"
                      value={rates.EmoloyeeEpfRate}
                      helperText={inputErrors.emoloyeeEpfRate}
                      error={inputErrors.emoloyeeEpfRate ? true : false}
                      onChange={(event) => {
                        if (
                          event.target.value !== null &&
                          event.target.value !== undefined &&
                          event.target.value !== "" &&
                          !isNaN(event.target.value)
                        ) {
                          setRates({
                            ...rates,
                            EmoloyeeEpfRate: event.target.value,
                          });
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid container>
                    <Grid item sm={6} md={6} className={classes.texFieldLabel}>
                      <InputLabel>Company EPF Rate</InputLabel>
                    </Grid>
                    <TextField
                      label="Company EPF Rate"
                      //variant="outlined"
                      id="filled-basic"
                      variant="filled"
                      name="CompanyEPFRate"
                      value={rates.CompanyEPFRate}
                      helperText={inputErrors.companyEPFRate}
                      error={inputErrors.companyEPFRate ? true : false}
                      onChange={(event) => {
                        if (
                          event.target.value != null &&
                          event.target.value !== undefined &&
                          event.target.value !== "" &&
                          !isNaN(event.target.value)
                        ) {
                          setRates({
                            ...rates,
                            CompanyEPFRate: event.target.value,
                          });
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid container>
                    <Grid item sm={6} md={6} className={classes.texFieldLabel}>
                      <InputLabel>ETF Rate</InputLabel>
                    </Grid>
                    <TextField
                      label="ETF Rate"
                      //  variant="outlined"
                      id="filled-basic"
                      variant="filled"
                      name="ETFRate"
                      fullWidth
                      value={rates.ETFRate}
                      helperText={inputErrors.eTFRate}
                      error={inputErrors.eTFRate ? true : false}
                      onChange={(event) => {
                        if (
                          event.target.value != null &&
                          event.target.value !== undefined &&
                          event.target.value !== "" &&
                          !isNaN(event.target.value)
                        ) {
                          setRates({
                            ...rates,
                            ETFRate: event.target.value,
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Grid item sm={6} md={6} className={classes.createButton}>
                      <Button
                        className={classes.button}
                        variant="contained"
                        size="large"
                        type="submit"
                      >
                        Enter
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {added ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The Rates successfully entered!
          </Alert>
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please Try Again!
          </Alert>
        </Stack>
      ) : null}
      {fill ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="warning">
            Please enter all the details!
          </Alert>
        </Stack>
      ) : null}
    </Box>
  );
}
