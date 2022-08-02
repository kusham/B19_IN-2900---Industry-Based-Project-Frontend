import * as React from "react";
import { useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginImg from "./login.png";
import { LoginApi,countEmployees } from "../../Api/Login/LoginApi";
import axios from 'axios';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.directfn.com/en/">
        DirectFN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login({ setUser, user }) {
  const [nonfill, setnonfill] = useState(false);
  const [invalid, setinvalid] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  useEffect(() => {
    axios.get("https://hr-and-assets-management.herokuapp.com/countEmployees/").then((res)=>{
      console.log(res.data.counts);
      if(res.data.counts===0)
      {
        window.location.replace('/signup')
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      userName: data.get("uname"),
      password: values.password,
    };
    if (data.get("uname") !== "" && values.password !== "") {
      const response = await LoginApi(user);
      if (response.success === true) {
        window.location.replace("/dashboard");
        setUser(response.user);
      } else {
        setinvalid(true);

        setTimeout(() => {
          setinvalid(false);
        }, 2000);
      }
    } else {
      setnonfill(true);
      setTimeout(() => {
        setnonfill(false);
      }, 2000);
    }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
    {
      user? (
        <></>
      ):(
<Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.thesoftwarereport.com/wp-content/uploads/2020/08/Tech-company-IPO.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <div className="loginImage">
              <img
                src={loginImg}
                width="200"
                style={{ position: "relative" }}
                alt="login"
              />
            </div>
            <br />
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl variant="outlined" fullWidth required>
                <TextField
                  margin="normal"
                  id="uname"
                  label="User Name"
                  name="uname"
                  autoComplete="username"
                  autoFocus
                />
              </FormControl>
              <br />

              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  label="Password"
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
              </Grid>
              {nonfill ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Please input both user name & password!
                  </Alert>
                </Stack>
              ) : null}
              {invalid ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Invalid Credentials!
                  </Alert>
                </Stack>
              ) : null}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      )
    }
    </>
   
        
     
     
  );
}
