import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 5,
    width: 275,
    marginBottom: 25,
    backgroundColor: "#e4ecf7",
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  levelGrid: {
    mb: 2,
    justifyContent: "center",
    display: "flex",
  },
  gridContainer: {
    justifyContent: "center",
    display: "flex",
   
  },
  avatar: {
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#183d78",
  },
  typographyJob:{
    fontSize:13
  }
}));

export default useStyles;
