import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Transition from './DashboardTransition';
export default function DashboardDialogConfirm({ open, handleCloseDialogDelete, handleDelete }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const confirmDelete = () => {
        handleDelete();
        handleCloseDialogDelete();
    }
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleCloseDialogDelete()}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title " className="MUI-titleDialog">
                    {'Nhắc nhở'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }}>
                        Bạn chắc chắn muốn xóa các lựa chọn này ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCloseDialogDelete} className="btn  btn-outline-danger btn-lg">
                        Hủy bỏ
                    </button>
                    <button className="btn btn-success btn-lg" onClick={confirmDelete}>
                        Đồng ý
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
