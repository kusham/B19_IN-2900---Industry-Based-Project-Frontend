import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import React from 'react'

const ConfirmApproval = ({confirmOpen, setConfirmOpen, handleApprove}) => {

  

  return (
    <Dialog open={confirmOpen} onClose={()=>setConfirmOpen(false)}>
        <DialogContent sx={{padding:2}}>
            <Typography>Are you sure to approve this leave?</Typography>

        </DialogContent>
        <DialogActions sx={{padding:2}}>
            <Grid container>
                <Grid item md={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Button
                    variant='contained'
                    color='inherit'
                    onClick={()=>{setConfirmOpen(false)}}>No</Button>
                </Grid>
                <Grid item md={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Button variant='contained'
                    color = 'error'
                    onClick={handleApprove}>Yes</Button>
                </Grid>
            </Grid>
        </DialogActions>
    
    </Dialog>
  )
}

export default ConfirmApproval