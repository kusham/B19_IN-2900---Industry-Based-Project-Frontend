import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";



export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '30ch',
        // '&:focus': {
        //   width: '40ch',
        // },
      },
    },
  }));


  
export const useStyles = makeStyles((theme) => ({
    paper: {
        background:   "linear-gradient(45deg, rgba(0, 0, 0, 0), rgba(84, 77, 81, 0.68))",
    },
    skeleton : {
      display: "flex",
      alignItems: "center",
      
      "& .MuiSkeleton-root" : {
        margin: theme.spacing(1, 0),
        borderRadius: theme.spacing(2),
      }
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: theme.spacing(2),
     
    },
    cardHeader: {
      "& .MuiCardHeader-title" : {
        fontSize:  theme.spacing(2),
        fontWeight: 450,
      
        
      },
      "& .MuiCardHeader-subheader" : {
        fontWeight: 400
      }
    },
    cvButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding : theme.spacing(0, 2, 1, 0),
    }

  }));
  
  