import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    paper : {
        borderRadius: theme.spacing(4),
        //padding : theme.spacing(0.7, 2, 2, 2),
     },
     tableRow : {
        "& .MuiTypography-root" : {
            fonFamily: 'Signika Negative',
            
        
         },
     },
     tableHead : {
        "& .MuiTypography-root" : {
           fontFamily: 'Source Sans Pro',
           fontSize: "20px",
           color: "white"
        },
        "& .MuiTableCell-root" : {
           // borderLeft: "1px solid",
            borderBottom: "none",
            //marginBottom: theme.spacing(0),
            paddingBottom: theme.spacing(1)
        }
    },
    searchBar:{
        display:"flex",
        justifyContent:"flex-end",
        "& .MuiSvgIcon-root": {
            
            fontSize: theme.spacing(5),
        
          },
    },
    searchArea:{
        height:theme.spacing(5),
        '&:hover': {
            border: "2px solid rgb(153, 0, 204)",
            backgroundColor:"rgb(249, 230, 255)",
        },
    },

}));
export default useStyles;