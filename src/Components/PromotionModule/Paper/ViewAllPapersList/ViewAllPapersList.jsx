import React, { useState, useEffect } from "react";
import { Box, Grid, Card, Typography, Button, Divider } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { viewAllPapersListApi } from "../../../../Api/PromotionModule/PaperApi/viewAllPapersListApi";
import useStyles from "./ViewAllPapersListStyles";

const ViewAllPapersList = ({ user }) => {
  const classes = useStyles();
  const [PaperList, setPaperList] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      if (user.jobRole !== "HR Manager") {
        window.location.href = "/dashboard";
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      setPaperList(await viewAllPapersListApi());
    }
    fetchData();
  }, []);

  return (
    <Box className={classes.Box}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <Typography className={classes.topic}>Evaluation Papers</Typography>
        </Grid>
        <Grid item xs={12} align="left" marginLeft={5} marginBottom={2}>
          {user.teamLead && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#183d78" }}
              onClick={() =>
                window.open("/promotion/Paper/CreatePaper", "_self")
              }
            >
              Create Paper
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        {PaperList.map((paper, key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.name}>
                  Paper ID : {paper.PaperID}
                </Typography>
                <Typography className={classes.name}>
                  Paper Name : {paper.PaperName}
                </Typography>
                <Typography className={classes.name}>
                  Paper Type : {paper.PaperType}
                </Typography>
                <Typography className={classes.name}>
                  Date Created : {paper.DateCreated}
                </Typography>
              </CardContent>
              <Divider></Divider>
              <CardActions className={classes.pos}>
                <Button
                  sx={{ color: "#673ab7" }}
                  onClick={() =>
                    window.open(
                      `/promotion/Paper/display/${paper.PaperID}`,
                      "_self"
                    )
                  }
                >
                  View Paper&nbsp;
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default ViewAllPapersList;
