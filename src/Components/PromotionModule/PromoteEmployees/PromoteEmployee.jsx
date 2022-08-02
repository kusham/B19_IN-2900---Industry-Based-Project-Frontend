import {
  Avatar,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  getEvaluationDetails,
  promoteEmployee,
} from "../../../Api/PromotionModule/PromotionApi/PromotionApi";
import SnackBar from "../../SnackBar/SnackBar";

import { useStyles } from "./PromoteEmployeeStyles";
const contentHead = [
  "Employee",
  " Team lead",
  " Feedback",
  "Previous Position",
  "New Position",
  "Action",
];
const jobPositions = [
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
  "Product Manager",
  "Quality Assurance Engineer",
  "Intern",
];
const PromoteEmployee = () => {
  const [evaluationData, setEvaluationData] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const [render, setRender] = useState(false);

  const fetchData = async () => {
    setEvaluationData(await getEvaluationDetails());
  };
  useEffect(() => {
    fetchData();
  }, [render]);
  const handlePromote = async (evaluation) => {
    const promotionData = {
      _id: evaluation.evaluation._id,
      newPosition: jobRole,
      previousPosition: evaluation.jobRole,
      evaluator: evaluation.teamLeadID,
    };
    const response = await promoteEmployee(
      evaluation.employeeID,
      promotionData
    );
    setJobRole("");
    if (response.success === true) {
      setOpenSnackBar(true);
      setSnackBarMessage(response.message);
      setRender(!render)
    }
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const classes = useStyles();
  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Paper square sx={{ mb: 3 }}>
        <Grid container className={classes.head}>
          {contentHead.map((content) => (
            <Grid key={content} item md={2} className={classes.headContent}>
              <Typography variant="h6">{content}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {!evaluationData ? (
        <Grid container className={classes.notAvailable}>
          <Typography variant="h6">Evaluation has not done yet</Typography>
        </Grid>
      ) : (
        evaluationData.map((evaluation) => (
          <Paper square key={evaluation}>
            <Grid container className={classes.row}>
              <Grid item md={2} className={classes.cellContent}>
                <Avatar sx={{ mr: 1 }} src={evaluation.employeePic} />
                <Typography variant="h6">{evaluation.employeeName}</Typography>
              </Grid>
              <Grid item md={2} className={classes.cellContent}>
                <Avatar sx={{ mr: 1 }} src={evaluation.teamLeadPic} />
                <Typography variant="h6">{evaluation.teamLeadName}</Typography>
              </Grid>
              <Grid item md={2} className={classes.cellContent}>
                <Typography variant="h6">
                  {evaluation.evaluation.Feedback}
                </Typography>
              </Grid>
              <Grid item md={2} className={classes.cellContent}>
                <Typography variant="h6">{evaluation.jobRole}</Typography>
              </Grid>
              <Grid item md={2} className={classes.cellContent}>
                <TextField
                  select
                  name="newJobRole"
                  value={jobRole}
                  label="New Position"
                  fullWidth
                  onChange={(event) => setJobRole(event.target.value)}
                >
                  {jobPositions.map(
                    (job) =>
                      evaluation.jobRole !== job && (
                        <MenuItem value={job} key={job}>
                          {job}
                        </MenuItem>
                      )
                  )}
                </TextField>
              </Grid>
              <Grid item md={2} className={classes.cellContent}>
                <Button
                  variant="contained"
                  color="success"
                  disabled={jobRole ? false : true}
                  onClick={() => handlePromote(evaluation)}
                >
                  Promote
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
      <SnackBar
        handleCloseSnackBar={handleCloseSnackBar}
        openSnackBar={openSnackBar}
        message={snackBarMessage}
      />
    </Box>
  );
};

export default PromoteEmployee;
