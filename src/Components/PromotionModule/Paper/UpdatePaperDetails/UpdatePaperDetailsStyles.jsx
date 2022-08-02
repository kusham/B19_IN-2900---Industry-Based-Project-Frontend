import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    backgroundColor: "#cfd8dc",
    width: "65%",
    marginLeft: "15%",
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
  viewButton: {
    display: "flex",
    paddingRight: "16%",
    justifyContent: "right",

    margin: theme.spacing(2, 5, 1),
  },
}));

export default useStyles;
