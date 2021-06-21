// React
import React from 'react'

// Material UI
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function ConfirmationDialog(props) {

    const { open, setOpen, text, callback } = props

    function close() {
        setOpen(false)
    }

    function confirm() {
        callback()
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle>
                Confirmation Required
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    onClick={confirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog