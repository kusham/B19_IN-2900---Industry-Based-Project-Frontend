import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paperMarking: {
    padding: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
  },
  header: {
    backgroundColor: "rgb(0, 0, 0, 0.3)",
    padding: theme.spacing(0.5),
    "& .MuiTypography-root": {
      fontWeight: 800,
    },
  },
  note: {
    margin: theme.spacing(2),
  },
  table: {
    padding: theme.spacing(2),
    "& .MuiTableCell-root": {
      border: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  strength: {
    padding: theme.spacing(2),
  },
  strengthHead: {
    backgroundColor: "rgb(0, 0, 0, 0.3)",
    padding: theme.spacing(0.5),
    //marginBottom: theme.spacing(1),
  },
  recommendation: {
    padding: theme.spacing(2),
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    "& .MuiAvatar-root": {
      height: 80,
      width: 80,
    },
  },
  cv: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  contact: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  panelHead: {
    padding: theme.spacing(2),
  },
  panelMember: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1.5),
  },
  item: {
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    "& .MuiTypography-root": {
      padding: theme.spacing(0.3, 0.5),
    },
  },
  deleteButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
