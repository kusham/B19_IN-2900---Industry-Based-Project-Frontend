import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    item : {
        display: 'flex',
        margin: theme.spacing(1)
    },
    buttonUpdate : {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttons: {
        margin: theme.spacing(0, 3, 3, 3)
    },
    yesNoButtons : {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(1.5),
        "& .MuiButton-containedPrimary": {
            background: "gray"
        }
    }
}))

export default useStyles;