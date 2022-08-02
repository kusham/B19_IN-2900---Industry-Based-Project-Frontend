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
import useStyles from "./AssetUpdateStyles";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { assignAssets } from '../../Api/AssetManagementModule/assetViewApi';

export default function AssetAssignModel({handleClose,data,show,assignFun}) {
    const [assetID, setAssetID] = useState(data.assetID);
    const [assignAsset, setAssignAsset] =useState(data._id);
    const [assetCategory, setAssetCategory] = useState(data.assetCategory);
    const [model, setModel] = useState(data.model);
    const [serialNumber, setSerialNumber] = useState(data.serialNumber);
    const [empID, setEmpID] = useState("")
    const [status, setStatus] = useState(data.status);
    const [error, seterror] = useState(false);
    const [added, setadded] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
 
    const open = show ? true : false;

    const assignation = async (e) =>
    {
        
        e.preventDefault();
        const employee = {empID}
        if(assetID&&assetCategory&&model&&serialNumber&&empID)
            {
                const response = await assignAssets(assignAsset,employee);
                if(response.success === true)
                {
                  setadded(true);
                  setTimeout(() => {
                      setadded(false);
                      handleClose();
                      assignFun(data._id)
                  }, 1000);
                  
                  

                
              }else
              {
                  seterror(true);
                  setTimeout(() => {
                      seterror(false);
                  }, 2000);
              }
        
        
            }else{
              seterror(true);
              setTimeout(() => {
                seterror(false);
              }, 2000);
            }
  }
    const classes = useStyles();
    return (
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        
      >   
      <Fade in={open}>
        <Box>
          <Paper elevation={5} className={classes.form}>
            <Grid container>
              <Grid item sm={12} md={12} className={classes.formHeader}>
                <LaptopChromebookIcon />
                <Typography variant="h4">
                  Asset Assign
                </Typography>
              </Grid>
                
              {added?(<Stack sx={{ width: '100%' }} spacing={2}><Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                                Asset has been successfully Assigned! — <strong>check it out!</strong>
                        </Alert>  </Stack>):null}
          {error?(<Stack sx={{ width: '100%' }} spacing={2}><Alert variant="filled" severity="error">
                                Please enter all the details! 
                </Alert></Stack>):null}
              <Grid item sm={12} md={12}>
                <Divider variant="middle" />
                <Divider variant="middle" />
              </Grid>

              <Grid item sm={12} md={12}>
              <form autoComplete="on" onSubmit={assignation}>
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
                            disabled
                            onChange={(e)=>{setAssetID(e.target.value)}}
                            fullWidth
                          />
                        </Grid>

                      <Grid container>
                        <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                          <InputLabel>Asset Category</InputLabel>
                        </Grid>
                        <TextField
                            label="Category"
                            variant="outlined"
                            name="assetCategory"
                            value={assetCategory}
                            disabled
                            onChange={(e)=>{setAssetCategory(e.target.value)}}
                            fullWidth
                          />
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
                              disabled
                              onChange={(e)=>{setModel(e.target.value)}}
                              fullWidth
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
                              disabled
                              onChange={(e)=>{setSerialNumber(e.target.value)}}
                              fullWidth
                            />
                      </Grid>

                    </Grid>
                    <Grid item sm={12} md={6} className={classes.inputs}>
                    <Grid container>
                            <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                            <InputLabel>Employee ID</InputLabel>
                            </Grid>
                                <TextField
                                label="Employee ID"
                                variant="outlined"
                                name="empID"
                                value={empID}
                                onChange={(e)=>{setEmpID(e.target.value);setIsDisabled(false)}}
                                fullWidth
                                />
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
                      Assign Asset
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    </Fade>
    </Modal>
    );
}

