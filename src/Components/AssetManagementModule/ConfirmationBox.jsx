import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationBox({opens,id,func1,func2,func3,handleClosed,typed}) {
  const [open, setOpen] = React.useState(opens);


  const handleClose = () => {
     
    setOpen(false);
    handleClosed();
      
    
  };
  const handleAgreed = () =>{
      if(typed === "fault")
      {
        func1(id);
      }else if(typed === "unassign")
      {
        func3(id);
        
      }else
      {
        func2(id);
      }
        setOpen(false);
        handleClosed();
      
  }

  return (
    <div >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosed}
        fullWidth={true}
        PaperProps={{
            style: {
                backgroundColor: '#e1f5fe',
                borderRadius:15
            },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <Typography variant="h5">
                {"Confirm the Action!"}
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* <Typography variant="h6">
                Are you sure want to {typed === "fault"?<b>create </b>:<b>release </b>}a Fault?<br/>
            </Typography>  */}
            {typed === "fault"&&<Typography >Are you sure want to <b>create </b> a Fault?</Typography>}
            {typed === "release-fault"&&<Typography >Are you sure want to <b>release </b> a Fault?</Typography>}
            {typed === "unassign"&&<Typography >Are you sure want to <b>unassign </b> asset?</Typography>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning" variant="contained" size="small">No</Button>
          <Button onClick={handleAgreed} color="success" variant="contained" size="small">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
