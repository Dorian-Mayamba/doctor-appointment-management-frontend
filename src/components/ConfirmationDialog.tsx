import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


interface ConfirmationDialogPropops{
    open:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    message:string;
}

const ConfirmDialog = ({ open, onClose, onConfirm, message }:ConfirmationDialogPropops) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Action</DialogTitle>
        <DialogContent>
          <Typography id="confirmation-dialog-description">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmDialog;
  