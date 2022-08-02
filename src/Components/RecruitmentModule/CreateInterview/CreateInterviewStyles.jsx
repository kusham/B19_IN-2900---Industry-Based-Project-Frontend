import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
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
    marginTop: theme.spacing(3),
    alignItems: "flex-end",
    justifyContent: "flex-start",
    "& .MuiTextField-root" : {
        width : theme.spacing(30)
    }
  },
  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
  texFieldLabel: {
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "center",
   "& .MuiFormLabel-root" : {
    fontWeight: 600,
    fontSize: 19
   },
  
  },
  interviewerIcons : {
    display: 'flex',
    justifyContent : 'flex-start',
  },
  menuItem : {
    display: 'flex',
    justifyContent : 'flex-start',
    alignItems: "center",

  },
  chip: {
    margin:theme.spacing(1, 0.5, 0, 0),
    backgroundColor: "rgba(49, 24, 62, 1)",
    color: "white",
    "& .MuiSvgIcon-root" : {
    color: "white",

    }
  }
}));

export default useStyles;
