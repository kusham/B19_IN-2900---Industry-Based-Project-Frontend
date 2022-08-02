import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { evaluatePaperApi } from "../../../../Api/PromotionModule/EvaluateApi/evaluatePaperApi";
import { displayAnsweredPaperToTeamleadApi } from "../../../../Api/PromotionModule/EvaluateApi/displayAnsweredPaperToTeamleadApi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useStyles from "./EvaluatePaperStyles";
import Stack from "@mui/material/Stack";

export default function EvaluatePaper({ user }) {
  const classes = useStyles();
  const { EmployeeID } = useParams();
  const { PaperID } = useParams();
  const { TeamLeadID } = useParams();

  const [Paper, setPaper] = useState([]);

  if (!user) {
    window.location.replace("/");
  }

  useEffect(() => {
    async function fetchData() {
      setPaper(await displayAnsweredPaperToTeamleadApi(EmployeeID, PaperID));
    }
    fetchData();
  }, [EmployeeID, PaperID]);
  const tid = EmployeeID;

  console.log("tid=" + tid);

  const [Questions, setQuestions] = useState([]);
  const [Feedback, setFeedback] = useState([]);
  const [added, setadded] = useState(false);
  const [error, seterror] = useState(false);

  const EvaluatePaperFunc = async () => {
    const response = await evaluatePaperApi(
      TeamLeadID,
      EmployeeID,
      PaperID,
      Questions,
      Feedback
    );
    if (response.success === true) {
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

    console.log("from response", response);
  };

  return (
    <Box className={classes.Box}>
      {/* <Grid item sm={12} md={12} className={classes.backButton}>
        <Button
          className={classes.Button}
          size="large"
          variant="contained"
          sx={{ backgroundColor: "#183d78" }}
          onClick={() =>
            window.open(`/promotion/evaluation/allSubmissions/${TeamLeadID}`, "_self")
          }
        >
          View Team-member Submissions
        </Button>
      </Grid> */}

      <Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            className={classes.gridContainer}
            spacing={2}
            columns={12}
          >
            <Grid item xs={6}>
              <Typography className={classes.head}>Evaluate Paper</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.gridContainer} justify="center">
          {Paper.map((p, key) => (
            <Grid item xs={12} key={key}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.name} value={p.PaperID}>
                    Paper ID : {p.PaperID}
                  </Typography>
                  <Typography className={classes.name}>
                    EmployeeID : {p.EmployeeID}
                  </Typography>
                  <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                  <Typography className={classes.name}>Questions :</Typography>

                  {p.Questions.map((item, key) => (
                    <Card className={classes.card1} key={key}>
                      <Typography className={classes.text}>
                        Question: {item.QuestionBody}
                      </Typography>
                      <Typography className={classes.text}>
                        EmployeeRating: {item.EmployeeRating}
                      </Typography>
                      <Grid sx={{ marginLeft: "30px" }}>
                        <FormControl className="formControl">
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="'size-radio-button-demo',"
                            value={Questions.TeamLeadRating}
                            onChange={(event) => {
                              setQuestions(
                                Questions.concat({
                                  QuestionID: item.QuestionID,
                                  QuestionBody: item.QuestionBody,
                                  EmployeeRating: event.target.value,
                                  TeamLeadRating: event.target.value,
                                })
                              );
                              console.log(Questions);
                            }}
                          >
                            <FormControlLabel
                              value="weak"
                              control={<Radio size="small" />}
                              label="weak"
                            />
                            <FormControlLabel
                              value="Average"
                              control={<Radio size="small" />}
                              label="Average"
                            />
                            <FormControlLabel
                              value="Good"
                              control={<Radio size="small" />}
                              label="Good"
                            />
                            <FormControlLabel
                              value="Very Good"
                              control={<Radio size="small" />}
                              label="Very Good"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Card>
                  ))}
                  <Card className={classes.card1}>
                    <Typography className={classes.text}>Feedback :</Typography>
                    {/* <TextField
                      type="text"
                      label=""
                      variant="outlined"
                      id="outlined-basic"
                      value={Paper.Feedback}
                      onChange={(event) => {
                        setFeedback({
                          ...Feedback,
                          Feedback: event.target.value,
                        });
                      }}
                    /> */}
                    <TextareaAutosize
                      className={classes.textarea}
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Type your Feedback..."
                      value={Paper.Feedback}
                      onChange={(event) => {
                        setFeedback({
                          ...Feedback,
                          Feedback: event.target.value,
                        });
                      }}
                    />
                  </Card>
                </CardContent>
                <Grid className={classes.submitButton}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#183d78" }}
                    onClick={EvaluatePaperFunc}
                  >
                    Save
                  </Button>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {added ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The paper evaluated successfully!
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
    </Box>
  );
}
