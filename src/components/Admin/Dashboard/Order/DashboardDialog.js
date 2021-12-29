import { Dialog, DialogContent, DialogTitle, Stack, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { DialogContentText, Typography } from '@material-ui/core';
import Transition from './DashboardTransition';
import moment from 'moment'
export default function DashboardDialog({ open, onClose, steps, titleLabel, orderView }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onClose()}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle >{titleLabel}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Stack sx={{ width: '100%', maxWidth: 400 }} spacing={2}>
                        <Stepper alternativeLabel activeStep={orderView?.length - 1} style={{ display: 'flex' }}>
                            {steps.map((label, index) => {
                                let deliveryCurrent;
                                if (orderView?.length > index) {
                                    deliveryCurrent = orderView[index];
                                    if (orderView[2]) {
                                        label = deliveryCurrent?.status
                                    }
                                } else {
                                    deliveryCurrent = null;
                                }
                                return (
                                    <Step key={index}>
                                        <StepLabel sx={{ mt: 1, mr: 1 }}>{label}</StepLabel>
                                        <Typography sx={{ mt: 1, mr: 1, fontSize: '14px' }}>
                                            {deliveryCurrent ?
                                                moment(deliveryCurrent?.createdAt).format("DD-MM-YYYY HH:mm:ss")
                                                : null
                                            }
                                        </Typography>
                                    </Step>
                                )
                            }
                            )}
                        </Stepper>
                    </Stack>
                </DialogContentText>
            </DialogContent>

        </Dialog>
    )
}
