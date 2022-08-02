import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "10px",
    // paddingBottom: "30px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    backgroundColor: "#E0F7FA",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& .MuiTypography-h4": {
      margin: theme.spacing(1, 1),
      fontWeight: 500,
    },
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(5),
      marginLeft: theme.spacing(2),
    },
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    justifyContent: "flex-start",
    "& .MuiTextField-root": {
      width: theme.spacing(30),
    },
  },
  texFieldLabel: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    "& .MuiFormLabel-root": {
      fontWeight: 600,
      fontSize: 19,
    },
    paddingLeft: 20,
  },
  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
  Button: {
    backgroundColor: "#0091EA",
    color: "#e0f2f1",
    "&:hover": {
      color: "#d7dde0",
      backgroundColor: "#2f375e",
    },
  },
  formQ: {
    overflow: "scroll",
  },
}));
export default useStyles;
