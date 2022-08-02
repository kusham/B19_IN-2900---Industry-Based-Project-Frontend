import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Rubik",
    margin: theme.spacing(0, 0, 3.3, 2),
  },
  paper: {
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1, 3, 2, 2),
  },
  candidate: {
    marginTop: theme.spacing(2),
  },
  name: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTypography-title" : {
        fontFamily: "Rubik",
        color: "rgba(61, 58, 59, 0.9)"
    },
    "& .MuiTypography-body" : {
        fontFamily: "Rubik",
        color: "rgba(61, 58, 59, 0.5)"
    }
  },
  status: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(0)
    // "& .MuiTypography-body" : {
    //     fontFamily: "Rubik",
    //     color: "rgba(30, 171, 0, 0.8)"
    // }
  },
  skeleton : {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& .MuiSkeleton-root" : {
      margin: theme.spacing(1, 0),
      borderRadius: theme.spacing(2),
    }
  },
  MoreVert : {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export default useStyles;
