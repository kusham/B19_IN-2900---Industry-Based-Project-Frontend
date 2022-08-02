import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyItems: "center",
  },
  card: {
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    marginLeft: 9,
    maxWidth: 380,
    minWidth: 380,
    // backgroundColor:"#ac89e8"
    backgroundImage: `linear-gradient(to right, rgba(10, 238, 250), rgba(172, 137, 232))`,
  },

  avatar: {},
}));

export default useStyles;
