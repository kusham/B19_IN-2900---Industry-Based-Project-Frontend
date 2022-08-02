
import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#e1f5fe",
    },
    "&:hover": {
      backgroundColor: "#fafafa",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  


export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(2),
        "& .MuiTypography-h5": {
          fontFamily: "Rubik",
          margin: theme.spacing(0, 0, 0, 2),
        },
      },
      button: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: theme.spacing(2),
      },
      cellContent : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiTypography-h6": {
            fontSize: theme.spacing(2),
            fontFamily: "Rubik",
           
          },
      }
}));


