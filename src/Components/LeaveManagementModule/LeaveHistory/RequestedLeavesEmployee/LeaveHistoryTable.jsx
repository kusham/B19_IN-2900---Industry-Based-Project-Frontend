import { Button, styled, TableContainer, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getLeaveHistory } from "../../../../Api/LeaveManagementModule/LeaveApi";

import ViewMoreDialog from "../ViewDetailDialog";
import useStyles from "../RequestedLeavesTeamLead/RequestedLeavesStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#4a148c",
    // backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f3e5f5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#dcedc8",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LeaveHistoryTable = () => {
  const classes = useStyles();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [leave, setLeave] = React.useState(null);
  const [cancel, setCancel] = useState(false);
  const handleClickOpen = (leave) => {
    setLeave(leave);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCancel(false);
  };
  const fetchData = async () => {
    setLeaveHistory(await getLeaveHistory());
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    // <Paper elevation={4} sx={{ width: "100%", overflow: "hidden", p: 2 }} className={classes.paper}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <StyledTableCell><Typography color={"black"}>Leave Type</Typography></StyledTableCell>
            <StyledTableCell><Typography>Number of Days</Typography></StyledTableCell>
            <StyledTableCell><Typography>Leave Method</Typography></StyledTableCell>
            <StyledTableCell><Typography>Status</Typography></StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {leaveHistory &&
            leaveHistory.map((leave) => (
              <StyledTableRow key={leave.leaveHistory._id}>
                <TableCell>{leave.leaveHistory.leaveType}</TableCell>
                <TableCell>{leave.numberOfLeaveDates}</TableCell>
                <TableCell>{leave.leaveHistory.leaveMethod}</TableCell>
                <TableCell>{leave.leaveHistory.status}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleClickOpen(leave)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
                   
      </Table>
      {leave && (
        <ViewMoreDialog
          open={open}
          handleClose={handleClose}
          leaveHistory={leaveHistory} 
          setLeaveHistory={setLeaveHistory}
          leave={leave} 
          setCancel={setCancel}
          cancel={cancel}
        />
      )}

      {/* <TablePagination
        rowsPerPageOptions={[15, 5, 25, 100]}
        component="div"
        //count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </TableContainer>
    // </Paper>
  );
};

export default LeaveHistoryTable;
