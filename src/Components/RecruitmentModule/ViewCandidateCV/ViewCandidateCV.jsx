import { Apps, Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import React from "react";

const ViewCandidateCV = ({ openDialog, handleCloseDialog, candidateData }) => {
  return (
    <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        <Grid container>
          <Grid
            sm={10}
            md={10}
            item
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Apps fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5">
              {candidateData.candidateName
                ? candidateData.candidateName
                : candidateData.firstName +
                  " " +
                  candidateData.lastName +
                  "'s CV"}
            </Typography>
          </Grid>

          <Grid
            sm={2}
            md={2}
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider variant="middle" />
      <Divider variant="middle" />
      <DialogContent>
        {
          candidateData.cv ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
          <Viewer fileUrl={candidateData.cv} />
        </Worker>

          ): (
            <Typography variant="h6">
              Cv have not been uploaded.
            </Typography>
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default ViewCandidateCV;
