import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    card: {
       margin:theme.spacing(0,2,2,0),
       background: "linear-gradient(45deg,rgb(163, 163, 194),rgb(198, 216, 236))",
       "& .MuiTypography-h7": {
        color: "Black",
        fontFamily: "Georgia, serif;",
        
      },
      "& .MuiTypography-h8": {
        color: "Black",
        fontFamily: "Georgia, serif;",
        
      },
      '&:hover': {
        background: "linear-gradient(45deg, rgb(0, 153, 255),	rgb(0, 255, 255))",
        transform: "scale3d(1.05, 1.05, 1)",
      },
      },

}));
export default useStyles;