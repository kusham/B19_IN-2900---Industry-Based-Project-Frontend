
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  // title: {
  //   fontWeight: 600,
  //   fontSize: 25,
  //   padding:  theme.spacing(3),
  //   marginLeft: theme.spacing(1),
   
  // },
  root: {
    padding: theme.spacing(4, 4, 0, 4),
  },
  closeButton: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  content: {
    //display: "flex",
margin: theme.spacing(1,0)
    //  color:"#560027",
    //  marginRight: theme.spacing(2),
    //  fontWeight: 500,
    //  fontSize: 20
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  }, 
  card:{
    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    margin: theme.spacing(1,8,2,8),
   
    // backgroundColor: "#e8eaf6",
    // direction:"row",
    // justifyContent:"center",
    // alignItems:"center"
  }
}));

export default useStyles;
