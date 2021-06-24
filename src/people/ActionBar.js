// React
import React from 'react'

// Material UI
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import { DialogContentText, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'
import { Card, CardContent } from '@material-ui/core'

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import PublishIcon from '@material-ui/icons/Publish'
import GetAppIcon from '@material-ui/icons/GetApp'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

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

    function openNotImplemented() {
        setNotImplementedOpen(true)
    }

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    let fontSize = 'large'
    if (isSmall) {
        fontSize = "default"
    }

    return (
        <React.Fragment>
        <Grid item md={2} />
        <Grid item xs={12} md={8} align="center">
            <Card>
                <CardContent>
                    <ButtonGroup
                        variant="contained"
                    >
                        <Button
                            aria-label="Delete All People"
                            onClick={openNotImplemented}
                        >
                            <DeleteSweepIcon fontSize={fontSize} />
                        </Button>
                        <Button
                            aria-label="Download From Cloud"
                            onClick={openNotImplemented}
                        >
                            <CloudDownloadIcon fontSize={fontSize} />
                        </Button>
                        <Button
                            aria-label="Download All People"
                            onClick={openNotImplemented}
                        >
                            <GetAppIcon fontSize={fontSize} />
                        </Button>
                        <Button
                            aria-label="Upload Person Or People"
                            onClick={openNotImplemented}
                        >
                            <PublishIcon fontSize={fontSize} />
                        </Button>
                        <Button
                            aria-label="Upload To Cloud"
                            onClick={openNotImplemented}
                        >
                            <CloudUploadIcon fontSize={fontSize} />
                        </Button>
                        <Button
                            aria-label="Add New Person"
                            onClick={() => setNewPersonDialogOpen(true)}
                        >
                            <PersonAddIcon fontSize={fontSize} />
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
                </CardContent>
            </Card>
        </Grid>
        <Grid item md={2} />
        </React.Fragment>
    )
}

export default ActionBar