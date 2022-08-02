import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Rubik",
    margin: theme.spacing(0, 0, 2, 2),
  },
  paper: {
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1, 2, 2, 2),
    margin: theme.spacing(4, 0, 0, 4),
    backgroundColor:"#ede7f6",
  },
  form: {
    padding: theme.spacing(4),
   
  },
  input: {
    margin: theme.spacing(4, 4, 2, 2),
  },
  formLabel: {
    marginRight:4,
    marginBottom:4,
    "& .MuiFormLabel-root": {
      
      fontSize: 19,
      color:"rgb(0, 68, 102)"
      
    },
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    color:"white",
    background:"rgb(0, 85, 128)",
    marginBottom:theme.spacing(4),
    '&:hover':{
      color:"black",
    background:"rgb(179, 230, 255)",
    },
  },
}));

export default useStyles;