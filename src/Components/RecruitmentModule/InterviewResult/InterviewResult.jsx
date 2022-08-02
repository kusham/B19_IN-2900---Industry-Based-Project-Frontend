import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { AdminPanelSettings, Close } from "@mui/icons-material";
import { Box } from "@mui/system";

const InterviewResult = ({
  openDialog,
  handleCloseDialog,
  selectedCandidates,
  interviewResult,
}) => {
  console.log(interviewResult);
  return (
    <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ bgcolor: "blue", color: "white" }}>
        <Grid container>
          <Grid
            sm={10}
            md={10}
            item
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AdminPanelSettings fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5">
              {selectedCandidates.candidateName
                ? selectedCandidates.candidateName
                : selectedCandidates.firstName +
                  " " +
                  selectedCandidates.lastName +
                  "'s CV"}
            </Typography>
          </Grid>

          <Grid
            sm={2}
            md={2}
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton sx={{ color: "white" }} onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {!interviewResult ? (
          <Typography color="error" fontWeight={500}>
            Interview details are not available for this candidate profile
          </Typography>
        ) : (
          <Box>
            <Grid container>
              <Grid item md={12}>
                <Typography>
                  {interviewResult.InterviewType} Interview
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography>
                  {new Date(interviewResult.InterviewDate).toDateString()}
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {interviewResult.Interviewers.map((interviewer) => (
                  <Grid
                    sx={{
                      mr: 3,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar src={interviewer.Interviewer.profilePic} />
                    <Typography>
                      {interviewer.Interviewer.employeeFirstName +
                        " " +
                        interviewer.Interviewer.employeeLastName}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid item md={12}></Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Typography>Interview Result</Typography>
              {interviewResult.CandidateMarks.length === 0 ? (
                <Typography>: Candidate has not Interviewed yet</Typography>
              ) : (
                <Grid item md={12}>
                  {interviewResult.CandidateMarks.map((mark) => (
                    <Card sx={{ p: 2 }}>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Avatar sx={{mr : 1}} src={mark.Interviewer.profilePic} />
                        <Typography>
                          {mark.Interviewer.employeeFirstName +
                            " " +
                            mark.Interviewer.employeeLastName}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>
                          Knowledge of Specific Job Skills :{" "}
                          {mark.marks.knowledgeOfSpecificJobSkills}
                        </Typography>

                        <Typography>
                          Related Job Experience :{" "}
                          {mark.marks.relatedJobExperience}
                        </Typography>

                        <Typography>
                          Related Education or Training :{" "}
                          {mark.marks.relatedEducationOrTraining}
                        </Typography>

                        <Typography>
                          Initiative : {mark.marks.initiative}
                        </Typography>

                        <Typography>
                          Communication or Listening Skills :{" "}
                          {mark.marks.communicationOrListeningSkills}
                        </Typography>

                        <Typography>
                          Attitude : {mark.marks.attitude}
                        </Typography>

                        <Typography>
                          Interest in Company or Position :{" "}
                          {mark.marks.interestInCompanyOr}
                        </Typography>
                      </Grid>
                      <Grid>
                        {mark.marks.strengths.length > 0 && (
                          <Grid>
                            <Typography>strengths : </Typography>
                            {mark.marks.strengths.map((strength) => (
                              <Typography>{strength}</Typography>
                            ))}
                          </Grid>
                        )}
                        {mark.marks.weaknesses.length > 0 && (
                          <Grid>
                            <Typography>weaknesses : </Typography>
                            {mark.marks.weaknesses.map((weakness) => (
                              <Typography>{weakness}</Typography>
                            ))}
                          </Grid>
                        )}
                        {mark.marks.additionalComments.length > 0 && (
                          <Grid>
                            <Typography>strengths : </Typography>
                            {mark.marks.additionalComments.map(
                              (additionalComment) => (
                                <Typography>{additionalComment}</Typography>
                              )
                            )}
                          </Grid>
                        )}
                        <Typography>
                          Recommendation : {mark.marks.recommendation}
                        </Typography>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterviewResult;
