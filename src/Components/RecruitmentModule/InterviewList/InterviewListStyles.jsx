import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
 paper : {
    borderRadius: theme.spacing(4),
    padding : theme.spacing(0.7, 2, 2, 2),
 },
 tableHead : {
     "& .MuiTypography-root" : {
        fontFamily: 'Source Sans Pro',
        fontSize: "18px",
        color: "rgba(4, 8, 91, 0.8)"
     },
     "& .MuiTableCell-root" : {
        // borderLeft: "1px solid",
         borderBottom: "none",
         //marginBottom: theme.spacing(0),
         paddingBottom: theme.spacing(0)
     }
 },
 avatar : {
     height: theme.spacing(4),
     width: theme.spacing(4),
 },
 tableRow : {
    "& .MuiTypography-root" : {
        fonFamily: 'Signika Negative',
        //color: 'red'
     },
 }
}));

export default useStyles;
