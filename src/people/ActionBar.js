// React
import React from 'react'

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Dialog from '@material-ui/core/Dialog'
import { DialogContentText, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

// custom
import PersonDialog from './PersonDialog'

function NotImplementedDialog(props) {

    const { open, setOpen } = props

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle 
                align="center" 
            >
                Feature Not Implemented
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sorry, this feature has not been implemented yet.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )

}

function ActionBar(props) {

    const { callback } = props
    const [newPersonDialogOpen, setNewPersonDialogOpen] = React.useState(false)
    const [notImplementedOpen, setNotImplementedOpen] = React.useState(false)

    return (
        <Grid item xs={12} align="center">
            <ButtonGroup
                variant="contained"
            >
                <Button
                    aria-label="Download All People"
                    onClick={() => setNotImplementedOpen(true)}
                >
                    <CloudDownloadIcon fontSize="large" />
                </Button>
                <Button
                    aria-label="Upload New Person"
                    onClick={() => setNotImplementedOpen(true)}
                >
                    <CloudUploadIcon fontSize="large" />
                </Button>
                <Button
                    aria-label="Add New Person"
                    onClick={() => setNewPersonDialogOpen(true)}
                >
                    <PersonAddIcon fontSize="large" />
                </Button>
            </ButtonGroup>
            <PersonDialog
                open={newPersonDialogOpen}
                setOpen={setNewPersonDialogOpen}
                callback={callback}
            />
            <NotImplementedDialog
                open={notImplementedOpen}
                setOpen={setNotImplementedOpen}
            />
        </Grid>
    )
}

export default ActionBar