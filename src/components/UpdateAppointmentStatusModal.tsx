import {Modal,Box,List,ListItem,ListItemButton, ListItemText} from '@mui/material';
import { useState } from 'react';
import { STATUS_OBJ } from '../../src/constants/constants';

interface StatusProps{
    isOpen:boolean;
    handleClose:()=>void;
    handleUpdateStatus:(status:string | null)=>void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const UpdateAppointmentStatusModal = ({isOpen,handleClose,handleUpdateStatus}:StatusProps)=>{

    const [statusObjs] = useState<string[]>([STATUS_OBJ.accepted,STATUS_OBJ.cancelled,STATUS_OBJ.completed, STATUS_OBJ.pending]);

    

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{ ...style }}>
                <List>
                    {statusObjs.map((status,index)=>{
                        return(
                            <ListItem key={index}>
                                <ListItemButton onClick={(e)=>handleUpdateStatus(e.currentTarget.textContent)}>
                                    <ListItemText primary={status}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Modal>
    )
}

export default UpdateAppointmentStatusModal;