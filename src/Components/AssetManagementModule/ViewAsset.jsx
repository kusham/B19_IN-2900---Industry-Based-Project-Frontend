import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Grid } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Button, Box } from "@mui/material/";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AssetUpdateModule from './AssetUpdateModule';
import AssetAssignModel from './AssetAssignModel';
import { availableAssetsApi,unavailableAssetsApi,allAssets,modelViewApi,unassignAsset,releaseFaultAsset, createFaultAsset, assignAssets, searchAssetCategory } from '../../Api/AssetManagementModule/assetViewApi';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Typography} from "@mui/material";
import useStyles from "./AssetViewListStyles";
import AssetViewStats from './AssetViewStats';
import ConfirmationBox from './ConfirmationBox';
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

const  ViewAsset = ({user}) => {
    const [assets,setAssets] = useState([]);
    const [eachAsset, setEachAsset] = useState([]);
    const [show,setShow] = useState(false);
    const [show2,setShow2] = useState(false);
    const [ assetID, setAssetID ] = useState("");
    const [type, setType ] = useState(""); //type of confirmation box whether fault or release fault
    const [empID, setEmployee] = useState("");
    const [assignAsset, setAssignAsset] = useState("");
    const [error,seterror] = useState(false);
    const [number,setNumber] = useState({available:0,nonAvailable:0,fault:0})
    const [showConfirmation, setShowConfirmation] = useState(false);
    if(!user)
    {
       window.location.replace('/');
    }
    useEffect(()=>{
        API.get("https://hr-and-assets-management.herokuapp.com/assets/").then((res)=>{
            // console.log(res)
            setAssets(res.data.assets);
            setNumber({available:res.data.availableCount,nonAvailable:res.data.nonavblCount,fault:res.data.faultCount})
            // console.log(number.available)
        }).catch((err)=>{
            alert(err.message);
        })

        
    },[])

    const handleSearch = async (status) =>
    {
        
        if(status === "Available"){
            const response = await availableAssetsApi();
            setAssets(response);
            
        }
        if(status === "Non-Available"){
            
            const response = await unavailableAssetsApi();
            setAssets(response);
        }
        if(status === "All"){
            
            const response = await allAssets();
            console.log(response)
            setAssets(response.assets);
        }
    }

    const showModal = async (id) =>
    {
        const response = await modelViewApi(id);
        setEachAsset(response);
        setShow(true);
    }
    const hideModal = () =>
    {
        setShow(false);
    }
    const ShowModalView = async (id) => 
    {
        
        const response = await modelViewApi(id);
        setEachAsset(response);
        setShow2(true);
        // console.log(eachAsset);
       
        
        
    }
    const hideModalView = () =>
    {
        setShow2(false);
        setEachAsset("");
        
    }
    
    
    const unassign = async (id) =>
    {
        
        const response = await unassignAsset(id);
        if(response.success === true)
        {
            const index = assets.findIndex((assets)=>assets._id===id)
            const newAssets = [...assets]
            newAssets[index].status="Available";
            setAssets(newAssets)
            setEmployee("")
            setNumber({available:++number.available,nonAvailable:--number.nonAvailable,fault:number.fault})
        }else
        {
            seterror(true);
            setTimeout(() => {
                seterror(false);
            }, 2000);
        }
        

    }
    const releaseFault = async (id) =>
    {
        const response = await releaseFaultAsset(id);
        if(response.success === true)
        {
            const index = assets.findIndex((assets)=>assets._id===id)
            const newAssets = [...assets]
            newAssets[index].status="Available";
            setAssets(newAssets)
            setEmployee("")
            setNumber({available:++number.available,nonAvailable:number.nonAvailable,fault:--number.fault})
        }else{
            seterror(true);
            setTimeout(() => {
                seterror(false);
            }, 2000);
        }
        

    }
    const createFault = async (id) =>
    {
        const response = await createFaultAsset(id);
        if(response.success === true)
        {
            const index = assets.findIndex((assets)=>assets._id===id)
            const newAssets = [...assets]
            newAssets[index].status="Fault";
            setAssets(newAssets)
            setEmployee("")
            setNumber({available:--number.available,nonAvailable:number.nonAvailable,fault:++number.fault})
        }else{
            seterror(true);
            setTimeout(() => {
                seterror(false);
            }, 2000);
        }

    }
    

    const assignAssetFunction = async (id) =>
    {
        setShow(false);
        const index = assets.findIndex((assets)=>assets._id===id)
        const newAssets = [...assets]
        newAssets[index].status="Non-Available";
        setAssets(newAssets)
        setNumber({available:--number.available,nonAvailable:++number.nonAvailable,fault:number.fault})
       
    }
    const searchCategoryBar = async (category) =>
    {
        
            const response = await searchAssetCategory(category);
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
        

    }
    const updateAssetFunction = async (id,asset) =>
    {
        const index = assets.findIndex((assets)=>assets._id===id)
        const newAssets = [...assets]
        newAssets[index].assetCategory=asset.assetCategory
        newAssets[index].model=asset.model
        newAssets[index].serialNumber=asset.serialNumber
        newAssets[index].status=asset.status;
        setAssets(newAssets)
    }
    const confirmBox = async (id) =>
    {
        setAssetID(id);
       setShowConfirmation(true);
    }
    const hideConfirmationBox = () =>
    {
        setAssetID("");
       setShowConfirmation(false);
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
            <AssetViewStats countAvailable={number.available} countNonAvailable={number.nonAvailable} countFault={number.fault}/>    
              <br />
            </Grid>
            <Grid>
            <div style={{ display:"flex",flexDirection:'row',justifyContent:"space-between" }} className={classes.topics}>
                <div className="dropdown" style={{ marginTop:5}}>
                  <button className="btn btn-secondary dropdown-toggle" style={{ borderRadius:15}}  type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  Status
                  </button>
                  <div className="dropdown-menu" labelled="dropdownMenu2">
                  <button className="dropdown-item" type="button" onClick={()=>{handleSearch("Available")}}>Available</button>
                  <button className="dropdown-item" type="button" onClick={()=>{handleSearch("Non-Available")}}>Non-Available</button>
                  <button className="dropdown-item" type="button" onClick={()=>{handleSearch("All")}}>All</button>
                  </div>
                </div>
                <div className="dropdown" style={{ marginTop:5 }}>
                    <button className="btn btn-secondary dropdown-toggle" style={{ borderRadius:15}}  type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                    </button>
                    <div className="dropdown-menu" labelled="dropdownMenu2">
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
                    {user.jobRole === "IT Employee"&&(<StyledTableCell align="center">ACTION</StyledTableCell>)}
                    
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
                        { asset.status === 'Fault'&&(<Typography style={{ color:'red' }}> Fault</Typography>)} 
                        {asset.status === 'Available'&&(<Typography style={{ color:'blue' }}>Available</Typography>)}
                        {asset.status === 'Non-Available'&&(<Typography style={{ color:'green' }}> Not-Available</Typography>)}
                      </StyledTableCell>
                      {user.jobRole === "IT Employee"&&(
                        asset.status === 'Available'?
                            (<TableCell align="center">
                                <button className='btn btn-primary announce' onClick={()=>{showModal(asset._id);setAssignAsset(asset._id);}}>Assign</button>
                                 <button className='btn btn-danger' onClick={()=>{confirmBox(asset._id);setType("fault");}} style={{ marginLeft:"5px" }}>Fault</button>
                                 <button className='btn btn-success' onClick={()=>{ShowModalView(asset._id)}} style={{ marginLeft:"5px" }}>Update</button>
                                 </TableCell>)

                            :asset.status === 'Fault'?
                        (<TableCell align="center">
                                <button className='btn btn-danger' onClick={()=>{confirmBox(asset._id);setType("release-fault");}} style={{ width:140 }}>Release Fault</button>
                                <button className='btn btn-success' onClick={()=>{ShowModalView(asset._id)}} style={{ marginLeft:"6px" }}>Update</button>
                                </TableCell>):
                            (<TableCell align="center">
                                 <button className='btn btn-warning btn-block' onClick={()=>{confirmBox(asset._id);setType("unassign");}}>Release</button>
                                 <button className='btn btn-danger btn-block' onClick={()=>{confirmBox(asset._id);setType("fault");}} style={{ marginLeft:"5px" }}>Fault</button>
                                 <button className='btn btn-success btn-block' onClick={()=>{ShowModalView(asset._id)}} style={{ marginLeft:"5px" }}>Update</button>
                             </TableCell>)
                 
                      )}
                      
                      
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
                  {/* modal for update asset */}
                  { show2===true&&(<AssetUpdateModule data={eachAsset} show={true} handleClose={hideModalView} updateFun={updateAssetFunction}/>)}
                 {/* modal for assign asset */}
                  { show===true&&(<AssetAssignModel data={eachAsset} show={true} handleClose={hideModal} assignFun={assignAssetFunction}/>)}
                 {showConfirmation === true&&(<ConfirmationBox opens={true} typed={type} func1={createFault} func2={releaseFault} func3={unassign} id={assetID} handleClosed={hideConfirmationBox}/>)}
      </Box>
    </div>
        
    );

    
}




export default ViewAsset;