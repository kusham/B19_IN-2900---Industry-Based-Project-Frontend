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
  AlertTitle,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FeedIcon from "@mui/icons-material/Feed";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import useStyles from "./UpdatePaperDetailsStyles";
import { useParams } from "react-router-dom";
// import { viewAllQuestionsApi } from "../../../../Api/PromotionModule/QuestionApi/viewAllQuestionsApi";
// import { addMoreQuestionsApi } from "../../../../Api/PromotionModule/PaperApi/addMoreQuestionsApi";
import { viewOnePaperApi } from "../../../../Api/PromotionModule/PaperApi/viewOnePaperApi";
import { updatePaperDetailsApi } from "../../../../Api/PromotionModule/PaperApi/updatePaperDetailsApi";

export default function CreateCurruntSalary({ user }) {
  const classes = useStyles();

  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [fill, setFill] = useState(false);
  const [record, setRecord] = useState({
    PaperID: "",
    PaperType: "",
    PaperName: "",
  });

  const { PaperID } = useParams();

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await viewOnePaperApi(PaperID);
      setRecord(result[0], record);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     setQuestionList(await viewAllQuestionsApi());
  //   }
  //   fetchData();
  // }, []);

  // const addMoreQues = async () => {
  //   addMoreQuestionsApi(PaperID, selectedQuestions);
  // };

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    papername: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!record.PaperName) {
      setInputErrors((prevState) => ({
        ...prevState,
        papername: "Paper name is required",
      }));
      isError = true;
    }

    const regExp = /^[\w]*$/i;
    if (!record.PaperName.match(regExp)) {
      setInputErrors((prevState) => ({
        ...prevState,
        papername: "Only A-Z, a-z, 0-9, _ are valid",
      }));
      isError = true;
    }
    return isError;
  };
  //-----------------------------------------------------

  const UpdatePaperDetails = async (e) => {
    e.preventDefault();
    if (!errorHandle()) {
      // if (PaperID && record) {
      const response = await updatePaperDetailsApi(PaperID, record);
      window.location.reload(false);
      if (response.success === true) {
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
    <Box>
      <Grid item className={classes.viewButton} sm={12} md={12}>
        <Button
          sx={{ backgroundColor: "#183d78" }}
          variant="contained"
          size="large"
          onClick={() =>
            window.open(`/promotion/Paper/display/${PaperID}`, "_self")
          }
        >
          View Paper
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <FeedIcon />
            <Typography variant="h4">Update Paper {PaperID}</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={UpdatePaperDetails}>
              <Grid container>
                <Grid item sm={12} md={12} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper ID</InputLabel>
                    </Grid>
                    <FormControl sx={{ minWidth: 120 }}>
                      <TextField
                        label="PaperID"
                        id="filled-basic"
                        variant="filled"
                        name="PaperID"
                        value={record.PaperID}
                        disabled
                        fullWidth
                      />
                    </FormControl>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper Type</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        PaperType
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="filled-basic"
                        variant="filled"
                        label="PaperType"
                        width="20"
                        value={record.PaperType}
                        onChange={(event) =>
                          setRecord({
                            ...record,
                            PaperType: event.target.value,
                          })
                        }
                      >
                        <MenuItem>None</MenuItem>
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
                    </FormControl>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper Name</InputLabel>
                    </Grid>
                    <TextField
                      label="PaperName"
                      id="filled-basic"
                      variant="filled"
                      name="PaperName"
                      fullWidth
                      value={record.PaperName}
                      helperText={inputErrors.papername}
                      error={inputErrors.papername ? true : false}
                      onChange={(event) =>
                        setRecord({
                          ...record,
                          PaperName: event.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  sx={{ backgroundColor: "#183d78" }}
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
            Paper successfully updated!
          </Alert>{" "}
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter all the details and Try again!
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
