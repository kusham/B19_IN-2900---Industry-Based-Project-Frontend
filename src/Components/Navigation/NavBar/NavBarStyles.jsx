import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        padding: theme.spacing(1)
    }, 
    breadcrumb: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(3)
    },
    arrowIcon : {
        display : 'flex',
        backgroundColor: "rgb(0, 0, 0, 0.2)",
        height : "30px",
        width : "30px",
    },
    avatar : {
        display: "flex",
        justifyContent: "center"
    },
    breadcrumbLink : {
        color: "rgb(0, 0, 0, 0.5)",
        textDecoration: 'none'
    }
}))

export default useStyles;