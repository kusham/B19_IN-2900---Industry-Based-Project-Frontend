import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Divider, Grid } from '@mui/material'
import { LogoutApi } from '../../Api/Login/LogoutApi'

const SessionExpiryDialog = () => {
const handleClose = ()=> {
  LogoutApi();
  sessionStorage.clear();
    window.location.replace("/");
}
   
  return (
    <Dialog open={true}>
      <DialogTitle>
        Your session has been expired...
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Grid container sx={{display: "flex", justifyContent: "flex-end"}}>
        <Button color="primary" variant='contained' onClick={handleClose}>
          Log out
        </Button>

        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default SessionExpiryDialog