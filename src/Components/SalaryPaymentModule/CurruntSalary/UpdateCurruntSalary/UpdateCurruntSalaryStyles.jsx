import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Box: {
    backgroundColor: "#d7dde0",
    width: "100%",
    height: "100%",
    padding: 25,
    paddingBottom: "10%",
  },
  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    backgroundColor: "#e1f5fe",
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
    color: "#0d47a1",
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
    justifyContent: "center",
    alignItems: "center",
    "& .MuiFormLabel-root": {
      fontWeight: 600,
      fontSize: 19,
    },
  },

  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
}));

export default useStyles;
