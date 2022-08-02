import React, { useState, useEffect } from "react";
import { Box, Grid, Card, Typography, Button, Divider } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { submitPaperApi } from "../../../../Api/PromotionModule/SubmissionApi/submitPaperApi";
import { displayPaperApi } from "../../../../Api/PromotionModule/SubmissionApi/displayPaperApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useStyles from "./DispalyAndSubmitPaperStyles";

export default function DispalyAndSubmitPaper({ user }) {
  const { EmployeeID } = useParams();
  const classes = useStyles();

  const [Paper, setPaper] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole === "CTO" || user.jobRole === "IT Employee") {
      window.location.href = "/dashboard";
    } else if (user.employeeID !== EmployeeID) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setPaper(await displayPaperApi(EmployeeID));
    }
    fetchData();
  }, [EmployeeID]);

  const [Questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SubmitPaperFunc = async () => {
    await submitPaperApi(EmployeeID, Questions, Paper[0].PaperID).then(() => {
      window.close();
    });
  };

  return (
    <Box className={classes.Box}>
      {Paper == null ? (
        <Grid item xs={12} md={12}>
          <Grid
            container
            className={classes.gridContainer}
            justify="center"
            spacing={2}
            columns={12}
            marginBottom={"33%"}
          >
            <Grid item xs={12}>
              <Typography className={classes.nohead}>
                You Have NO Evaluation Test today!
              </Typography>
              <Grid
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: 3,
                }}
              >
                <Button
                  className={classes.btn}
                  variant="contained"
                  onClick={() => window.close()}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Grid item xs={12} md={12}>
            <Grid
              container
              className={classes.gridContainer}
              spacing={2}
              columns={12}
            >
              <Grid item xs={6}>
                <Typography className={classes.head}>
                  Evaluation Test
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={classes.gridContainer} justify="center">
            {" "}
            {Paper.map((p, key) => (
              <Grid item xs={12} key={key}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography className={classes.name} value={p.PaperID}>
                      Paper ID : {p.PaperID}
                    </Typography>
                    <Typography className={classes.name}>
                      Paper Name : {p.PaperName}
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                    <Typography className={classes.name}>
                      Questions :
                    </Typography>

                    {p.questions.map((item, key) => (
                      <Card className={classes.card1} key={key}>
                        <Typography className={classes.text}>
                          {item.QuestionBody}
                        </Typography>
                        <Grid sx={{ marginLeft: "30px" }}>
                          <FormControl className="formControl">
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="'size-radio-button-demo',"
                              value={Questions.EmployeeRating}
                              onChange={(event) => {
                                setQuestions(
                                  Questions.concat({
                                    QuestionID: item.QuestionID,
                                    QuestionBody: item.QuestionBody,
                                    EmployeeRating: event.target.value,
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
                  </CardContent>
                  <Grid className={classes.submitButton}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#183d78" }}
                      onClick={handleClickOpen}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              className={classes.dialogBoxTopic}
            >
              Submit
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#183d78" }}
                onClick={SubmitPaperFunc}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#183d78" }}
                onClick={handleClose}
              >
                Return to Attempt
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </Box>
  );
}
