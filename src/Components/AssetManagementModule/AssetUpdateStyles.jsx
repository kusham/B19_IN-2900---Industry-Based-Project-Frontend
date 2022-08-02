import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(15),
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
    marginTop: theme.spacing(2),
    justifyContent: "flex-start",
    "& .MuiTextField-root" : {
        width : theme.spacing(30)
    }
  },
  texFieldLabel: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
   "& .MuiFormLabel-root" : {
    fontWeight: 600,
    fontSize: 19
   },
  
  },

  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
}));

export default useStyles;
