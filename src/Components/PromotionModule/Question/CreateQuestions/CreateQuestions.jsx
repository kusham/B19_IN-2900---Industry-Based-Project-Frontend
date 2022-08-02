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
import Select from "@mui/material/Select";
import { createQuestionApi } from "../../../../Api/PromotionModule/QuestionApi/createQuestionApi";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import useStyles from "./CreateQuestionsStyles";

export default function CreateQuestions({ user }) {
  const classes = useStyles();
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [fill, setFill] = useState(false);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    }
  }
  const [question, setQuestion] = useState({
    QuestionID: "",
    QuestionCatogory: "",
    QuestionBody: "",
  });

  //--------------validation-----------------------
  const [inputErrors, setInputErrors] = useState({
    questionID: "",
    questionCatogory: "",
    questionBody: "",
  });

  const errorHandle = () => {
    let isError = false;

    if (!question.QuestionID) {
      setInputErrors((prevState) => ({
        ...prevState,
        questionID: "Question ID is required",
      }));
      isError = true;
    }
    if (!question.QuestionCatogory) {
      setInputErrors((prevState) => ({
        ...prevState,
        questionCatogory: "Question Catogory is required",
      }));
      isError = true;
    }
    if (!question.QuestionBody) {
      setInputErrors((prevState) => ({
        ...prevState,
        questionBody: "Question Body is required",
      }));
      isError = true;
    }
    return isError;
  };
  //-----------------------------------------------------

  const CreateQuestionsFunc = async (e) => {
    console.log("CreateQuestionsFunc");
    e.preventDefault();
    // if (
    //   question.QuestionID &&
    //   question.QuestionCatogory &&
    //   question.QuestionBody
    // ) {
    if (!errorHandle()) {
      const response = await createQuestionApi(question);
      window.location.reload(false);
      if (response.success === true) {
        console.log("success");
        setadded(true);
        setTimeout(() => {
          setadded(false);
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
          className={classes.Button}
          variant="contained"
          size="large"
          onClick={() => window.open("/promotion/Questions", "_self")}
        >
          View All Questions
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <AttachMoneyRoundedIcon />
            <Typography variant="h4">Create New Question</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={CreateQuestionsFunc}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid
                      item
                      sm={4}
                      md={4}
                      marginLeft={5}
                      className={classes.texFieldLabel}
                    >
                      <InputLabel>Question ID</InputLabel>
                    </Grid>
                    <FormControl sx={{ minWidth: 120 }}>
                      <TextField
                        className={classes.textField}
                        label="QuestionID"
                        variant="outlined"
                        name="QuestionID"
                        value={question.QuestionID}
                        helperText={inputErrors.questionID}
                        error={inputErrors.questionID ? true : false}
                        onChange={(event) => {
                          if (
                            event.target.value !== null &&
                            event.target.value !== undefined &&
                            event.target.value !== ""
                          ) {
                            setQuestion({
                              ...question,
                              QuestionID: event.target.value,
                            });
                          }
                        }}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      sm={4}
                      md={4}
                      ml={5}
                      className={classes.texFieldLabel}
                    >
                      <InputLabel>Question Catogory</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Catogory
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={question.QuestionCatogory}
                        label="Category"
                        // helperText={inputErrors.questionCatogory}
                        error={inputErrors.questionCatogory ? true : false}
                        onChange={(event) => {
                          setQuestion({
                            ...question,
                            QuestionCatogory: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value="SE">SE</MenuItem>
                        <MenuItem value="BA">BA</MenuItem>
                        <MenuItem value="QA">QA</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="UI/UX">UI/UX</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                        <MenuItem value="SSE">SSE</MenuItem>
                        <MenuItem value="SA">SA</MenuItem>
                        <MenuItem value="TL">TL</MenuItem>
                      </Select>
                      <FormHelperText style={{ color: "red" }}>
                        {inputErrors.paperType}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      sm={4}
                      md={4}
                      marginLeft={5}
                      className={classes.texFieldLabel}
                    >
                      <InputLabel>Question Body</InputLabel>
                    </Grid>
                    <TextField
                      className={classes.textField}
                      label="Question Body"
                      variant="outlined"
                      name="QuestionBody"
                      value={question.QuestionBody}
                      helperText={inputErrors.questionBody}
                      error={inputErrors.questionBody ? true : false}
                      onChange={(event) => {
                        if (
                          event.target.value != null &&
                          event.target.value !== undefined &&
                          event.target.value !== ""
                        ) {
                          setQuestion({
                            ...question,
                            QuestionBody: event.target.value,
                          });
                        }
                      }}
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
            New Question successfully created!
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
