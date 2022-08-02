import { Delete } from "@mui/icons-material";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { markedCandidate } from "../../../Api/RecruitmentModule/InterviewApi";
import useStyles from "./MarkingStyles";

const levels = ["Poor", "Fair", "Ok", "Good", "Excellent"];

const criteria = [
  {
    label: "Knowledge of specific job skills",
    name: "knowledgeOfSpecificJobSkills",
  },
  { label: "Related job experience", name: "relatedJobExperience" },
  {
    label: "Related education or training",
    name: "relatedEducationOrTraining",
  },
  { label: "Initiative", name: "initiative" },
  {
    label: "Communication/Listening skills",
    name: "communicationOrListeningSkills",
  },
  { label: "Attitude", name: "attitude" },
  {
    label: "Interest in company/Position",
    name: "interestInCompanyOrPosition",
  },
];
const MarkingSheet = ({ interview }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [marks, setMarks] = useState({
    interviewer: JSON.parse(sessionStorage.getItem("user")).employeeID,
    knowledgeOfSpecificJobSkills: "",
    relatedJobExperience: "",
    relatedEducationOrTraining: "",
    initiative: "",
    communicationOrListeningSkills: "",
    attitude: "",
    interestInCompanyOrPosition: "",
    strengths: [],
    weaknesses: [],
    additionalComments: [],
    selectedForTheSecondInterview: false,
    selected: false,
    Reject: false,
    holdUntilOthersAreInterviewed: false,
  });
  const [additionalMarkValue, setAdditionalMarkValue] = useState({
    strengths: "",
    weaknesses: "",
    additionalComments: "",
  });
  const [checked, setChecked] = useState(
    Array(7)
      .fill(0)
      .map(() => new Array(5).fill(false))
  );
  const [checked2, setChecked2] = useState([false, false, false]);
  const [errors, setErrors] = useState({ error1: false, error2: false });

  const handleOnChange = (event, index1, index2) => {
    let temp = [...checked];

    temp[index1].forEach((value, position) => {
      if (value === true) {
        return (temp[index1][position] = false);
      }
    });
    temp[index1][index2] = true;
    setChecked(temp);
    setMarks({ ...marks, [event.target.name]: event.target.value });
  };

  const handleAdditionalOnChange = (event) => {
    setAdditionalMarkValue({
      ...additionalMarkValue,
      [event.target.name]: event.target.value,
    });
  };

  const errorHandle = () => {
    let recommendCounter = 0;
    let isError = false;
    Object.keys(marks).forEach((property) => {
      if (marks[property] === "") {
        setErrors((prevState) => ({
          ...prevState,
          error1: true,
        }));
        isError = true;
      }
      if (marks[property] === false) {
        recommendCounter++;
      }
    });
    if (recommendCounter === 4) {
      setErrors((prevState) => ({
        ...prevState,
        error2: true,
      }));
      isError = true;
    }
    return isError;
  };

  const handleSubmit = async () => {
    if (!errorHandle()) {
      const response = await markedCandidate(marks, interview._id);
      handleClear();
      navigate("/interview", { state: response });
    }
    setTimeout(() => {
      setErrors({ error1: false, error2: false });
    }, 5000);
  };

  const handleClear = () => {
    setChecked(
      Array(7)
        .fill(0)
        .map(() => new Array(5).fill(false))
    );
    setChecked2([false, false, false]);
    setMarks({
      knowledgeOfSpecificJobSkills: "",
      relatedJobExperience: "",
      relatedEducationOrTraining: "",
      initiative: "",
      communicationOrListeningSkills: "",
      attitude: "",
      interestInCompanyOrPosition: "",
      strengths: [],
      weaknesses: [],
      additionalComments: [],
      selectedForTheSecondInterview: false,
      selected: false,
      Reject: false,
      holdUntilOthersAreInterviewed: false,
    });
  };

  return (
    <Paper elevation={4} square className={classes.paperMarking}>
      <Grid container className={classes.header}>
        <Typography variant="h6">Overall Assessments</Typography>
      </Grid>
      {interview.InterviewType === "Technical" && (
        <Typography className={classes.note} variant="body1">
          Note: Please do note discuss salary expectations at the technical
          interview. This will be discussed at the final interview.
        </Typography>
      )}
      <Paper elevation={0} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {levels.map((level) => (
                <TableCell key={level} align="center">
                  {level}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {criteria.map((c, index1) => (
              <TableRow key={c.label}>
                <TableCell>{c.label}</TableCell>
                {levels.map((level, index2) => (
                  <TableCell key={level} align="center">
                    <Checkbox
                      checked={checked[index1][index2]}
                      color="success"
                      name={c.name}
                      value={level}
                      onChange={(event) =>
                        handleOnChange(event, index1, index2)
                      }
                      //onClick={() => handleSelect(index1, index2)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {errors.error1 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please completed the above table!
          </Alert>
        </Stack>
      )}

      <Grid container className={classes.strength}>
        <Grid item md={12} className={classes.strengthHead}>
          <Typography>Strength</Typography>
        </Grid>
        {marks.strengths &&
          marks.strengths.map((strength) => (
            <Grid item md={12} className={classes.item} key={strength}>
              <Grid container>
                <Grid item md={10}>
                  <Typography>{strength}</Typography>
                </Grid>
                <Grid item md={2} className={classes.deleteButton}>
                  <IconButton
                    onClick={() =>
                      setMarks({
                        ...marks,
                        strengths: marks.strengths.filter(
                          (value) => strength !== value
                        ),
                      })
                    }
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        <Grid item md={12} sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={11}>
              <TextField
                autoComplete="off"
                variant="filled"
                size="small"
                name="strengths"
                value={additionalMarkValue.strengths}
                onChange={handleAdditionalOnChange}
                placeholder="Enter strengths of candidate"
                fullWidth
              />
            </Grid>
            <Grid item md={1}>
              <Button
                sx={{ ml: 2, p: 1.3 }}
                color="success"
                size="large"
                variant="contained"
                disabled={additionalMarkValue.strengths ? false : true}
                onClick={() => {
                  setMarks({
                    ...marks,
                    strength: marks.strengths.push(
                      additionalMarkValue.strengths
                    ),
                  });
                  setAdditionalMarkValue({
                    ...additionalMarkValue,
                    strengths: "",
                  });
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.strength}>
        <Grid item md={12} className={classes.strengthHead}>
          <Typography>Weaknesses</Typography>
        </Grid>

        {marks.weaknesses.map((weakness) => (
          <Grid item md={12} className={classes.item} key={weakness}>
            <Grid container>
              <Grid item md={10}>
                <Typography>{weakness}</Typography>
              </Grid>
              <Grid item md={2} className={classes.deleteButton}>
                <IconButton
                  onClick={() =>
                    setMarks({
                      ...marks,
                      weaknesses: marks.weaknesses.filter(
                        (value) => weakness !== value
                      ),
                    })
                  }
                  size="small"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item md={12} sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={11}>
              <TextField
                autoComplete="off"
                variant="filled"
                size="small"
                name="weaknesses"
                value={additionalMarkValue.weaknesses}
                onChange={handleAdditionalOnChange}
                placeholder="Enter Weaknesses of candidate"
                fullWidth
              />
            </Grid>
            <Grid item md={1}>
              <Button
                sx={{ ml: 2, p: 1.3 }}
                color="success"
                size="large"
                variant="contained"
                disabled={additionalMarkValue.weaknesses ? false : true}
                onClick={() => {
                  setMarks({
                    ...marks,
                    weaknesses: marks.weaknesses.concat(
                      additionalMarkValue.weaknesses
                    ),
                  });
                  console.log(marks);
                  setAdditionalMarkValue({
                    ...additionalMarkValue,
                    weaknesses: "",
                  });
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.strength}>
        <Grid item md={12} className={classes.strengthHead}>
          <Typography>Additional comments</Typography>
        </Grid>

        {marks.additionalComments &&
          marks.additionalComments.map((additionalComment) => (
            <Grid item md={12} className={classes.item} key={additionalComment}>
              <Grid container>
                <Grid item md={10}>
                  <Typography>{additionalComment}</Typography>
                </Grid>
                <Grid item md={2} className={classes.deleteButton}>
                  <IconButton
                    onClick={() =>
                      setMarks({
                        ...marks,
                        additionalComments: marks.additionalComments.filter(
                          (value) => additionalComment !== value
                        ),
                      })
                    }
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        <Grid item md={12} sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={11}>
              <TextField
                autoComplete="off"
                variant="filled"
                size="small"
                name="additionalComments"
                value={additionalMarkValue.additionalComments}
                onChange={handleAdditionalOnChange}
                placeholder="Additional comments for candidate"
                fullWidth
              />
            </Grid>
            <Grid item md={1}>
              <Button
                sx={{ ml: 2, p: 1.3 }}
                color="success"
                size="large"
                variant="contained"
                disabled={additionalMarkValue.additionalComments ? false : true}
                onClick={() => {
                  setMarks({
                    ...marks,
                    additionalComments: marks.additionalComments.concat(
                      additionalMarkValue.additionalComments
                    ),
                  });
                  setAdditionalMarkValue({
                    ...additionalMarkValue,
                    additionalComments: "",
                  });
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.recommendation}>
        <Grid item md={12}>
          <Typography fontWeight={700}>Recommendation</Typography>
        </Grid>
        <Grid item md={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked2[0]}
                  onChange={() => {
                    setChecked2([true, false, false]);
                    interview.InterviewType === "HR"
                      ? setMarks({
                          ...marks,
                          selected: !marks.selected,
                        })
                      : setMarks({
                          ...marks,
                          selectedForTheSecondInterview:
                            !marks.selectedForTheSecondInterview,
                        });
                  }}
                  name={
                    interview.InterviewType === "HR"
                      ? "selected"
                      : "selectedForTheSecondInterview"
                  }
                />
              }
              label={
                interview.InterviewType === "HR"
                  ? "Selected"
                  : "Selected for the second interview"
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked2[1]}
                  onChange={() => {
                    setChecked2([false, true, false]);
                    setMarks({
                      ...marks,
                      Reject: !marks.Reject,
                    });
                  }}
                  name="Reject"
                />
              }
              label="Reject"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked2[2]}
                  onChange={() => {
                    setChecked2([false, false, true]);
                    setMarks({
                      ...marks,
                      holdUntilOthersAreInterviewed:
                        !marks.holdUntilOthersAreInterviewed,
                    });
                  }}
                  name="holdUntilOthersAreInterviewed"
                />
              }
              label="Hold until others are interviewed"
            />
          </FormGroup>
        </Grid>
      </Grid>
      {errors.error2 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Recommendation is required!
          </Alert>
        </Stack>
      )}

      <Grid container className={classes.submitButton}>
        <Button
          sx={{ mr: 2 }}
          onClick={handleClear}
          color="error"
          variant="contained"
        >
          Clear
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Submit
        </Button>
      </Grid>
    </Paper>
  );
};

export default MarkingSheet;
