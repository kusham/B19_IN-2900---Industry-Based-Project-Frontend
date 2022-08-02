import React, { useEffect, useState } from "react";
import { getLevels } from "../../../Api/ReportersManagementModule/OrganizationApi";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Divider, Button, Grid, Typography } from "@mui/material";
import useStyles from "../DisplayAndUpdateLevels/LevelsStyles";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LevelUpdateDialog from "./LevelUpdateDialog";
import { Link } from "react-router-dom";
import Level from "./Level";
function Levels() {
  const [levels, setLevels] = useState([]);
   const[render,setRender]=useState(true);

  useEffect(() => {
    async function fetchData() {
      setLevels(await getLevels());
    }
    fetchData();
  }, [render]);
  const classes = useStyles();
  //----------------------------
  // console.log(levels);
  return (
    <div>
      <Box padding={6} bgcolor="#d7dde0">
        <Paper elevation={2} sx={{ backgroundColor: "#c7cad1", padding: 5 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#183d78" }}
          >
            <CreditScoreIcon sx={{ width: 50, height: 50 }} />
            &nbsp; Update Levels
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }}></Divider>
          <Grid
            container
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {levels.length > 0 &&
              levels.map((level) => {
                return (
                  <Grid padding={2} key={level._id}>
                    <Level level={level} setRender={setRender} render={render}/>
                    {/* <Paper className={classes.paper}>
                      <Grid container>
                        <Grid item md={12}>
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {level.level}
                          </Typography>
                          <br />
                        
                          {
                            level.jobRole.map((job) => {
                             
                              return ( 
                               
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#c1dce8",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                  key={job}
                                >
                                  {job}
                              
                                </Typography>
                              );
                            })}
                          <br />
                        </Grid>
                        <Grid item md={12} sx={{ textAlign: "center" }}>
                          <LevelUpdateDialog
                            jobrole={level.jobRole}
                            setLevels={setLevels}
                            levels={levels}
                            level={level}
                            count={count}
                            setCount={setCount}
                          />
                        </Grid>
                      </Grid>
                    </Paper> */}
                  </Grid>
                );
              })}
          </Grid>
          <Button
            LinkComponent={Link}
            to={"/dashboard/organization/create"}
            sx={{ mt: 5 }}
            className={classes.button}
          >
            create levels
          </Button>{" "}
        </Paper>
      </Box>
    </div>
  );
}

export default Levels;
