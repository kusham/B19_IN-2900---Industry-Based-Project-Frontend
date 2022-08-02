import React from "react";
import { Typography, Button, Card, Grid, Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
function DisplayTeam({ team }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { _id, teamName, teamLeadID, TeamWithEmp, ProductOfTeam } = team;

  return (
    <div>
      <Card
        sx={{
          mt: 5,
          mb: 2,
          borderRadius: 5,
          padding: 3,
          minHeight: 500,
          minWidth: 320,
          // backgroundColor: "#e4ecf7",
          backgroundImage: `linear-gradient(to right, rgba(214, 243, 255), rgba(94, 204, 247))`,

          transition: "transform 0.15s ease-in-out",
          "&:hover": {
            transform: "scale3d(1.05, 1.05, 1)",
            backgroundImage: "#38bff5",
          },
        }}
      >
        <Typography
          align="center"
          variant="h6"
          sx={{ fontWeight: "bold", color: "#183d78" }}
        >
          {teamName}
        </Typography>
        <Grid sx={{ justifyContent: "center", display: "flex" }}>
          {TeamWithEmp.length > 0 &&
            TeamWithEmp.map((result, i, j, k) => {
              if (TeamWithEmp[i].employeeID === teamLeadID) {
                return (
                  <Grid sx={{ mb: 1, mt: 1 }} key={i}>
                    <Grid
                      sx={{ justifyContent: "center", display: "flex", mb: 1 }}
                    >
                      <Avatar
                        src={TeamWithEmp[i].profilePic}
                        sx={{
                          width: 80,
                          height: 80,
                          border: "4px solid #09559c",
                        }}
                        key={i}
                        component={"span"}
                      />
                    </Grid>
                    <Typography
                      component={"span"}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#09559c" }}
                    >
                      {TeamWithEmp[i].employeeID}
                      &nbsp;
                      {TeamWithEmp[i].employeeName}
                    </Typography>
                  </Grid>
                );
              }
            })}
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }}></Divider>
        <Grid>
          <Typography component={"span"}>
            {TeamWithEmp.length > 0 &&
              TeamWithEmp.map((result, i) => {
                if (TeamWithEmp[i].employeeID !== teamLeadID) {
                  return (
                    <Typography
                      component={"span"}
                      key={i}
                      sx={{ color: "#09559c", fontWeight: "bold", mt: 2 }}
                    >
                      <Grid container sx={{ mb: 1 }}>
                        <Grid item>
                          <Avatar
                            sx={{ border: "2px solid #09559c" }}
                            src={TeamWithEmp[i].profilePic}
                            component={"span"}
                          ></Avatar>
                        </Grid>
                        <Grid item sx={{}}>
                          &nbsp;
                          {TeamWithEmp[i].employeeID}
                          <br /> &nbsp;
                          {TeamWithEmp[i].employeeName}
                        </Grid>
                      </Grid>
                    </Typography>
                  );
                }
              })}
          </Typography>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }}></Divider>

        <Typography align="center" sx={{ color: "#183d78" }}>
          {ProductOfTeam.length > 0 &&
            ProductOfTeam.map((product, i) => {
              console.log(i);
              console.log(ProductOfTeam.length);
              if (ProductOfTeam.length - 1 === i) {
                return (
                  <Typography key={product.productID} component={"span"}>
                    Product : {product.productName} <br />
                  </Typography>
                );
              }
              i++;
            })}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }}></Divider>

        <Typography align="center">
          {(user.jobRole === "HR Manager" ||
            user.employeeID === teamLeadID) && (
            <Button
              variant="contained"
              component={Link}
              to={`/teams/update/${_id}`}
              state={{ team }}
              sx={{
                backgroundColor: "#183d78",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#4d5575",
                  color: "#fff",
                },
              }}
            >
              Update Team
            </Button>
          )}
        </Typography>
      </Card>
    </div>
  );
}

export default DisplayTeam;
