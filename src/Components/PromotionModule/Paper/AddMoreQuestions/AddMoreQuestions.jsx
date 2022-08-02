import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Alert,
  Stack,
  Card,
  Divider,
  Typography,
  AlertTitle,
} from "@mui/material";
import { viewOnePaperApi } from "../../../../Api/PromotionModule/PaperApi/viewOnePaperApi";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { viewAllQuestionsApi } from "../../../../Api/PromotionModule/QuestionApi/viewAllQuestionsApi";
import { addMoreQuestionsApi } from "../../../../Api/PromotionModule/PaperApi/addMoreQuestionsApi";
import useStyles from "./AddMoreQuestionsStyles";
import CardContent from "@mui/material/CardContent";

export default function AddMoreQuestions({ user }) {
  const classes = useStyles();
  const { PaperID } = useParams();

  const [added, setadded] = useState(false);
  const [notadded, setnotadded] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [plselect, setPlselect] = useState(false);
  const [record, setRecord] = useState([]);
  const [QuestionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    setTimeout(() => setSpinner(false), 4000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await viewOnePaperApi(PaperID);
      setRecord(result[0], record);
      console.log(result);
    }
    fetchData();
  }, []);

  const recordQuestions = record.Questions;
  //console.log("paper questions:", recordQuestions);

  useEffect(() => {
    async function fetchData() {
      setQuestionList(await viewAllQuestionsApi());
    }
    fetchData();
  }, []);

  const addMoreQues = async (e) => {
    e.preventDefault();
    if (selectedQuestions.length !== 0) {
      addMoreQuestionsApi(PaperID, selectedQuestions).then((response) => {
        if (response.success === true) {
          setadded(true);
          setTimeout(() => {
            setadded(false);
          }, 4000);
        }
        if (response.success === false) {
          setnotadded(true);
          setTimeout(() => {
            setnotadded(false);
          }, 4000);
        }
      });
    } else {
      setPlselect(true);
      setTimeout(() => {
        setPlselect(false);
      }, 4000);
    }
  };

  return (
    !spinner && (
      <div>
        <Box className={classes.Box}>
          <Grid item className={classes.viewButton} sm={12} md={12}>
            <Grid>
              <Grid item paddingLeft={35}>
                <Typography variant="h4" className={classes.topic}>
                  <AddOutlinedIcon /> Add More Questions
                </Typography>
              </Grid>
            </Grid>
            <Grid item marginLeft={8}>
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
          </Grid>
          <Grid className={classes.formGrid}>
            <Paper className={classes.form}>
              <Grid container>
                <Grid item sm={12} md={12}>
                  <form autoComplete="off" onSubmit={addMoreQues}>
                    <Grid>
                      <Grid
                        container
                        sx={{ paddingRight: 5, paddingLeft: 1 }}
                        className={classes.texFieldLabel}
                      >
                        <Grid item sm={12} md={12}>
                          <Typography className={classes.name}>
                            Paper ID : {record.PaperID}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={12}>
                          <Typography className={classes.name}>
                            Paper Name : {record.PaperName}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={12}>
                          <Typography className={classes.name}>
                            Paper Type : {record.PaperType}
                          </Typography>
                        </Grid>

                        <Grid item sm={12} md={12}>
                          <Typography className={classes.name}>
                            Questions :
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid className={classes.gridq}>
                        {record.Questions.map((ques, key) => (
                          <Grid container key={key}>
                            <Grid item sm={12} md={12}>
                              <ul>
                                <li>
                                  <Typography className={classes.textq}>
                                    {ques.QuestionBody}
                                  </Typography>
                                </li>
                              </ul>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item sm={12} md={12}>
                        <Typography className={classes.head2}>
                          Add more questions
                        </Typography>
                        <Grid item sm={12} md={12}>
                          <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                        </Grid>
                        <Grid container padding={5}>
                          {QuestionList.filter(
                            (q1) =>
                              !recordQuestions.find(
                                (q2) => q1.QuestionID === q2.QuestionID
                              )
                          ).map((ques, key) => (
                            <Grid item sm={12} md={12} key={key}>
                              <Card className={classes.card2}>
                                <Typography className={classes.text}>
                                  {ques.QuestionBody}
                                </Typography>
                                <Checkbox
                                  className={classes.checkbox}
                                  onChange={(e) => {
                                    // add to list
                                    if (e.target.checked) {
                                      setSelectedQuestions([
                                        ...selectedQuestions,
                                        {
                                          QuestionID: ques.QuestionID,
                                          QuestionBody: ques.QuestionBody,
                                        },
                                      ]);
                                    } else {
                                      //remove from list
                                      setSelectedQuestions(
                                        selectedQuestions.filter(
                                          (q) =>
                                            q.QuestionID !== ques.QuestionID
                                        )
                                      );
                                    }
                                  }}
                                  value={selectedQuestions}
                                  style={{ margin: "20px" }}
                                  type="checkbox"
                                />
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                        <Grid
                          item
                          className={classes.selectedQGrid}
                          sm={12}
                          md={12}
                        >
                          <Typography align="center" className={classes.name}>
                            Selected Questions
                          </Typography>
                          {selectedQuestions.length === 0 ? (
                            <Card className={classes.card2}>
                              <CardContent align="center">
                                <Typography className={classes.none}>
                                  No questions selected
                                </Typography>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className={classes.card2}>
                              {selectedQuestions.map((element, key) => (
                                <CardContent key={key}>
                                  <ul>
                                    <li>{element.QuestionBody}</li>
                                  </ul>
                                </CardContent>
                              ))}
                            </Card>
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sm={12}
                        md={12}
                        className={classes.createButton}
                      >
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#183d78" }}
                          onClick={addMoreQues}
                        >
                          Add &nbsp;
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {added ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Questions successfully added!
              </Alert>
            </Stack>
          ) : null}
          {notadded ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                Please Try again!
              </Alert>
            </Stack>
          ) : null}
          {plselect ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="warning">
                Please Select questions to ADD!
              </Alert>
            </Stack>
          ) : null}
        </Box>
      </div>
    )
  );
}
