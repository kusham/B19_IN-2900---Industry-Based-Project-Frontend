import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  styled,
  TableContainer,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getRequestedLeaves } from "../../../../Api/LeaveManagementModule/LeaveApi";
import ViewDetailTeamLead from "./ViewDetailTeamLead";
import useStyles from "./RequestedLeavesStyles";
import ContentPasteSearchTwoToneIcon from "@mui/icons-material/ContentPasteSearchTwoTone";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4a148c",
    // backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f3e5f5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fffde7",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RequestedLeavesTeamLead = () => {
  const classes = useStyles();
  const [requestedLeaves, setRequestedLeaves] = useState([]);
  const [open, setOpen] = useState(false);
  const [leaveDetail, setLeaveDetail] = useState(null);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  // ---------
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    setFilteredRecords(
      requestedLeaves.filter(
        (requestedLeave) =>
          requestedLeave.employee.employeeID
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          requestedLeave.employee.employeeFirstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          requestedLeave.leave.status
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  }, [search, requestedLeaves]);
  //  -------

  const handleClickOpen = (Leave) => {
    setLeaveDetail(Leave);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setApprove(false);
    setReject(false);
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  const fetchData = async () => {
    setRequestedLeaves(await getRequestedLeaves());
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Grid container className={classes.searchBar}>
          <ContentPasteSearchTwoToneIcon />

          <Grid>
            <div style={{ marginLeft: 10 }}>
              <input
                className={classes.searchArea}
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <br />
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <StyledTableCell>
                <Typography>Employee</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>Leave Type</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>Leave Method</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>Start Date</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>End Date</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>Status</Typography>
              </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestedLeaves &&
              filteredRecords.map((requestedLeave) => (
                <StyledTableRow
                  key={requestedLeave.leave._id}
                  className={classes.tableRow}
                >
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ mr: 1 }}
                      src={requestedLeave.employee.profilePic}
                    />
                    {requestedLeave.employee.employeeFirstName +
                      " " +
                      requestedLeave.employee.employeeLastName}
                  </TableCell>
                  <TableCell>{requestedLeave.leave.leaveType}</TableCell>
                  <TableCell>{requestedLeave.leave.leaveMethod}</TableCell>
                  <TableCell>
                    {new Date(requestedLeave.leave.startDate).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(requestedLeave.leave.endDate).toDateString()}
                  </TableCell>
                  <TableCell>{requestedLeave.leave.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleClickOpen(requestedLeave)}
                      variant="contained"
                      color="secondary"
                    >
                      View
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>

          {leaveDetail && (
            <ViewDetailTeamLead
              open={open}
              onClose={onClose}
              leaveDetail={leaveDetail}
              setApprove={setApprove}
              approve={approve}
              setReject={setReject}
              reject={reject}
              requestedLeaves={requestedLeaves}
              setRequestedLeaves={setRequestedLeaves}
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
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default RequestedLeavesTeamLead;
