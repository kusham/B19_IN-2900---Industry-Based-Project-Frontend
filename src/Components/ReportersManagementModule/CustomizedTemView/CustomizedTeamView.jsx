import { React, useState, useEffect } from "react";

import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";

import { viewAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";
import { Avatar, Card } from "@mui/material";
import { Grid } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const StyledTreeItem = styled((props) => (
  //   <TreeItem {...props} TransitionComponent={TransitionComponent} />
  <TreeItem {...props} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `3px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function CustomizedTeamView() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setTeams(await viewAllTeams());
    }
    fetchData();
  }, []);

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0", "1", "2", "3", "4"]}
      defaultCollapseIcon={<MinusSquare />}
      // defaultExpandIcon={<PlusSquare />}
      defaultExpandIcon={
        <Box>
          <GroupsIcon
            sx={{
              width: 50,
              height: 50,
              //backgroundColor: "blue",
              borderRadius: 1,
              color: "#0b90bd",
            }}
          />
        </Box>
      }
      defaultEndIcon={<CloseSquare />}
      sx={{ height: 625, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <StyledTreeItem nodeId="0" label="TEAMS" sx={{ color: "#0b90bd" }}>
        {teams &&
          teams.map((team, i) => {
            return (
              <Card
                sx={{
                  mt: 2,
                  padding: 2,
                  backgroundImage: `linear-gradient(to right, rgba(213, 239, 247), rgba(12, 189, 247))`,
                }}
                key={team._id}
              >
                <Box sx={{ m: 1 }}>
                  <StyledTreeItem
                    nodeId={`${i} + 1`}
                    label={team.teamName}
                    sx={{ color: "#0b90bd" }}
                  >
                    <TreeView defaultExpanded={["0"]}>
                      {team.TeamWithEmp.map((member, j) => {
                        return (
                          <Card
                            sx={{
                              padding: 1,
                              mb: 2,

                              backgroundImage: `linear-gradient(to right, rgba(206, 233, 242), rgba(100, 209, 245))`,
                            }}
                            key={j}
                          >
                            <Grid container sx={{ mb: 2 }}>
                              <Grid item md={1}>
                                <Avatar src={member.profilePic} />
                              </Grid>
                              <Grid item md={11}>
                                <StyledTreeItem
                                  sx={{ color: "#06465c" }}
                                  nodeId={`${j}`}
                                  label={member.employeeName}
                                />
                              </Grid>
                            </Grid>
                          </Card>
                        );

                        //  console.log(++flag)
                      })}
                    </TreeView>
                  </StyledTreeItem>
                </Box>
              </Card>
            );
          })}
      </StyledTreeItem>
    </TreeView>
  );
}
