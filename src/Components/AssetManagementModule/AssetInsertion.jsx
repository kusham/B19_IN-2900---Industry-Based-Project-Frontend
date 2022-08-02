import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography,
    Alert,
    Stack,
    AlertTitle
  } from "@mui/material";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from "./AssetInsertionStyles";
import { assetInsertionApi } from '../../Api/AssetManagementModule/assetInsertionApi';

function AssetInsertion({user}) {
    const [assetID, setAssetID] = useState("");
    const [assetCategory, setAssetCategory] = useState("");
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [status, setStatus] = useState("Available");
    const [error, seterror] = useState(false);
    const [added, setadded] = useState(false);
    const [alreadyID, setalreadyID] = useState(false);
    const [inputErrors, setInputErrors] = useState({assetID:false});
    const [isDisabled, setIsDisabled] = useState(true);
    if(!user)
    {
      window.location.replace('/');
    }else{
      if(user.jobRole !== "IT Employee")
      {
        window.location.href = "/dashboard";
      }
    }
    
    const sendData = async (e) =>
    {
        e.preventDefault();
        const regexAssetID = /^A[0-9]{4}$/; //A0123
        
        const asset = {assetID, assetCategory, model, serialNumber, status}
        if(assetID&&assetCategory&&model&&serialNumber)
            {
              if(!assetID.match(regexAssetID))
              {
                setInputErrors({assetID:true})
              }else
              {
                const response = await assetInsertionApi(asset);
                if(response.success === true)
                {
                    setAssetID("");
                    setAssetCategory("");
                    setModel("");
                    setSerialNumber("");
                    setStatus("Available");
                    setInputErrors({assetID:false})
                    setadded(true);
                    setTimeout(() => {
                        setadded(false);
                    }, 2000);
                }
                if(response.success === false){
                    setalreadyID(true);
                    setTimeout(() => {
                        setalreadyID(false);
                    }, 2000);
                }
              }
                
                
        }else
        {
            seterror(true);
            setTimeout(() => {
                seterror(false);
            }, 2000);
        }
        
        
    }
    const classes = useStyles();
    return (
        
    <Box>
      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <LaptopChromebookIcon />
            <Typography variant="h4">
              Asset Insertion
            </Typography>
          </Grid>
            
            
          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={sendData}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Asset ID</InputLabel>
                    </Grid>
                      <TextField
                        label="ID"
                        variant="outlined"
                        name="assetID"
                        value={assetID}
                        onChange={(e)=>{setAssetID(e.target.value);setIsDisabled(false)}}
                        fullWidth
                        error={inputErrors.assetID ? true : false}
                        helperText="Ex - A0123"
                      />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Asset Category</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={assetCategory}
                        label="Category"
                        onChange={(e)=>{setAssetCategory(e.target.value);setIsDisabled(false)}}
                        >
                        
                        <MenuItem value="Laptop">Laptop</MenuItem>
                        <MenuItem value="Mobile">Mobile</MenuItem>
                        <MenuItem value="Tablet">Tablet</MenuItem>
                        <MenuItem value="Keyboard">Keyboard</MenuItem>
                        <MenuItem value="Router">Router</MenuItem>
                        <MenuItem value="UPS">UPS</MenuItem>
                        <MenuItem value="Printer">Printer</MenuItem>
                        <MenuItem value="Monitor">Monitor</MenuItem>
                        <MenuItem value="Headphone">Headphone</MenuItem>
                        </Select>
                        <FormHelperText>Category of Asset</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Asset Model</InputLabel>
                    </Grid>
                        <TextField
                          label="Model"
                          variant="outlined"
                          name="model"
                          value={model}
                          onChange={(e)=>{setModel(e.target.value);setIsDisabled(false)}}
                          fullWidth
                          helperText="Ex - Asus,Hp,Apple"
                        />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Serial Number</InputLabel>
                    </Grid>
                        <TextField
                          label="Serial Number"
                          variant="outlined"
                          name="serialNumber"
                          value={serialNumber}
                          onChange={(e)=>{setSerialNumber(e.target.value);setIsDisabled(false)}}
                          fullWidth
                        />
                  </Grid>

                </Grid>
                 <Grid item sm={12} md={6} className={classes.inputs}>

                 <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Asset Status</InputLabel>
                    </Grid>
                        <FormControl sx={{ m: 2, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={status}
                            label="Status"
                            onChange={(e)=>{setStatus(e.target.value);setIsDisabled(false)}}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Non-Available">Non-Available</MenuItem>
                            <MenuItem value="Fault">Fault</MenuItem>
                            </Select>
                            <FormHelperText>Status of Asset</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isDisabled?true:false}
                >
                  Add Asset
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {added?(<Stack sx={{ width: '100%' }} spacing={2}><Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                            Asset has been successfully added! — <strong>check it out!</strong>
                    </Alert>  </Stack>):null}
      {error?(<Stack sx={{ width: '100%' }} spacing={2}><Alert variant="filled" severity="error">
                            Please enter all the details! 
            </Alert></Stack>):null}
      {alreadyID?(<Stack sx={{ width: '100%' }} spacing={2}><Alert variant="filled" severity="error">
                            Asset ID already exists 
            </Alert></Stack>):null}
    </Box>
    );
}

export default AssetInsertion;