import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
   
    backgroundColor: "#183d78",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4d5575",
      color: "#fff",
    },
  },
  card:{
    backgroundColor:"#e4ecf7"
  }
 
}));
export default useStyles;
