import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Grid } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Box } from "@mui/material/";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { searchAvailableAssetCategory } from '../../Api/AssetManagementModule/assetViewApi';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Typography} from "@mui/material";
import useStyles from "./AssetViewListStyles";
import AvailableAssetStats from './AvailableAssetStats';
import { styled } from "@mui/material/styles";
import {API} from '../../Api/index';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#e1f5fe",
    },
    "&:hover": {
      backgroundColor: "#fafafa",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

const  AvailableAssetList = ({user}) => {
    const [assets,setAssets] = useState([]);
    const [error,seterror] = useState(false);
    const [number,setNumber] = useState({available:0});
    let [ count,setCount ] = useState(0);
    if(!user)
    {
      window.location.replace('/');
    }
    else
    {
      if(user.jobRole=== "IT Employee"||user.jobRole==="HR Manager")
      {
        window.location.href = "/dashboard";
      }
    }
    
    useEffect(()=>{
        if(count===0)
        {
            API.get("https://hr-and-assets-management.herokuapp.com/assets/available").then((res)=>{
            setAssets(res.data);
            setNumber({available:res.data.length})
            }).catch((err)=>{
                alert(err.message);
            })
        }else{
            API.get("https://hr-and-assets-management.herokuapp.com/assets/available").then((res)=>{
            setNumber({available:res.data.length})
            }).catch((err)=>{
                alert(err.message);
            })
        }
        

        
    },[count])


   
    
   
    const searchCategoryBar = async (category) =>
    {
        
            const response = await searchAvailableAssetCategory(category);
            if(response.success === true)
            {
                setAssets(response.data);
            }else
            {
                seterror(true);
                setTimeout(() => {
                    seterror(false);
                }, 2000);
            }
            setCount(++count);
        

    }
    
   
    const classes = useStyles();
    return (
    <div>
      <Box className={classes.Box}>
        
        <Grid container sx={{ p: 4 }}>
          <Grid
            item
            sm={12}
            md={12}
            sx={{
              mt: 2,
            }}
          >
            <Grid>
            <AvailableAssetStats countAvailable={number.available}/>    
              <br />
            </Grid>
            <Grid>
            <div style={{ display:"flex",flexDirection:'row',justifyContent:"space-between" }} className={classes.topics}>
                <div className="dropdown" style={{ marginTop:5 }}>
                    <button className="btn btn-secondary dropdown-toggle" style={{ borderRadius:15}}  type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                    </button>
                    <div className="dropdown-menu" labelled="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("All")}}>All</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Laptop")}}>Laptop</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Mobile")}}>Mobile</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Tablet")}}>Tablet</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Keyboard")}}>Keyboard</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Router")}}>Router</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("UPS")}}>UPS</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Printer")}}>Printer</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Monitor")}}>Monitor</button>
                    <button className="dropdown-item" type="button" onClick={()=>{searchCategoryBar("Headphone")}}>Headphone</button>
                    </div>
                </div>
            </div><br/>
            {error?(<Stack sx={{ width: '100%' }} spacing={2}><Alert variant="filled" severity="error">
                             Something was wrong! 
             </Alert></Stack>):null}
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Asset ID</StyledTableCell>
                    <StyledTableCell align="center">CATEGORY</StyledTableCell>
                    <StyledTableCell align="center">MODEL</StyledTableCell>
                    <StyledTableCell align="center">SERIAL NUMBER</StyledTableCell>
                    <StyledTableCell align="center">STATUS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map(asset => (
                    <StyledTableRow key={asset._id}>
                      <StyledTableCell align="center">
                        {asset.assetID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {asset.assetCategory}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {asset.model}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {asset.serialNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {asset.status === 'Available'&&(<Typography style={{ color:'blue' }}>Available</Typography>)} 
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
        
    );

    
}




export default AvailableAssetList;