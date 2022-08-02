import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 1,
    paddingBottom: 10,
  },

  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    backgroundColor: "#efebe9",
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
    color: "#183d78",
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
  },
  textfield: {
    display: "flex",
    justifyContent: "left",
  },

  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
  Button: {
    backgroundColor: "#2f375e",
    color: "#e0f2f1",
    "&:hover": {
      color: "#183d78",
      backgroundColor: "#b0bec5",
    },
  },
}));

export default useStyles;
