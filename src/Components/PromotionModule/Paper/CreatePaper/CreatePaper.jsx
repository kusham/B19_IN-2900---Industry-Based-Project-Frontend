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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { createPaperApi } from "../../../../Api/PromotionModule/PaperApi/createPaperApi";
import { viewAllQuestionsApi } from "../../../../Api/PromotionModule/QuestionApi/viewAllQuestionsApi";
import { viewAllPapersListApi } from "../../../../Api/PromotionModule/PaperApi/viewAllPapersListApi";
import useStyles from "./CreatePaperStyles";

function CreatePaperForm({ user }) {
  const classes = useStyles();
  const [paperId, setPaperID] = useState("");
  const [papername, setPaperName] = useState("");
  const [paperType, setPaperType] = useState("");
  const [QuestionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [PaperList, setPaperList] = useState([]);
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [fill, setFill] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setQuestionList(await viewAllQuestionsApi());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setPaperList(await viewAllPapersListApi());
    }
    fetchData();
  }, []);

  // console.log("paperId", paperId);
  // console.log("papername", PaperList.length);
  // console.log("paperType", paperType);
  // console.log("selectedQuestions", selectedQuestions);

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    paperId: "",
    papername: "",
    paperType: "",
    selectedQuestions: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!paperId) {
      setInputErrors((prevState) => ({
        ...prevState,
        paperId: "Paper ID is required",
      }));
      isError = true;
    }
    if (!papername) {
      setInputErrors((prevState) => ({
        ...prevState,
        papername: "paper Name is required",
      }));
      isError = true;
    }
    if (!paperType) {
      setInputErrors((prevState) => ({
        ...prevState,
        paperType: "Paper Type is required",
      }));
      isError = true;
    }
    if (selectedQuestions.length === 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        selectedQuestions: "Please select Questions",
      }));
      isError = true;
    }

    const regExp = /^[\w]*$/i;
    if (!papername.match(regExp)) {
      setInputErrors((prevState) => ({
        ...prevState,
        papername: "Only A-Z, a-z, 0-9, _ are valid",
      }));
      isError = true;
    }
    return isError;
  };
  //-----------------------------------------------------

  const CreatePaperFunc = async (e) => {
    e.preventDefault();

    if (!errorHandle()) {
      const newPaper = {
        paperId,
        papername,
        paperType,
        selectedQuestions,
      };
      console.log("record", newPaper);
      //if (paperId && papername && paperType && selectedQuestions) {
      const response = await createPaperApi(newPaper);
      window.location.reload(false);
      console.log("response", response);
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
      <Grid item sm={12} md={12} className={classes.createButton}>
        <Button
          className={classes.Button}
          variant="contained"
          size="large"
          onClick={() => window.open("/promotion/Paper", "_self")}
        >
          View All Papers
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <EventNoteRoundedIcon />
            <Typography variant="h4">Create New Paper</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={CreatePaperFunc}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper Id</InputLabel>
                    </Grid>
                    <TextField
                      id="filled-basic"
                      label="PaperID"
                      variant="outlined"
                      name="paperId"
                      value={paperId}
                      helperText={inputErrors.paperId}
                      error={inputErrors.paperId ? true : false}
                      onChange={(e) => {
                        setPaperID(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper Type</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Paper Type
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={paperType}
                        fullWidth
                        label="paper Type"
                        //helperText={inputErrors.paperType}
                        error={inputErrors.paperType ? true : false}
                        onChange={(e) => {
                          setPaperType(e.target.value);
                        }}
                      >
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
                        {inputErrors.paperType}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper Name</InputLabel>
                    </Grid>
                    <TextField
                      label="Paper Name"
                      variant="outlined"
                      name="PaperName"
                      value={papername}
                      helperText={inputErrors.papername}
                      error={inputErrors.papername ? true : false}
                      onChange={(e) => {
                        setPaperName(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Questions</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 1, width: 600 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Questions
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedQuestions}
                        // helperText={inputErrors.selectedQuestions}
                        error={inputErrors.selectedQuestions ? true : false}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                        onChange={(e) => {
                          setSelectedQuestions(e.target.value);
                        }}
                      >
                        {QuestionList.map((q, key) => (
                          <MenuItem key={key} value={q.QuestionID}>
                            <Checkbox
                              checked={
                                selectedQuestions.indexOf(q.QuestionID) > -1
                              }
                            />
                            <ListItemText
                              primary={
                                [q.QuestionBody] +
                                [" ("] +
                                [q.QuestionCatogory] +
                                [")"]
                              }
                            />
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText style={{ color: "r#cf0028ed" }}>
                        {inputErrors.selectedQuestions}
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
                  Create
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
            New Paper created successfully!
          </Alert>{" "}
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please Try again!
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

export default CreatePaperForm;
