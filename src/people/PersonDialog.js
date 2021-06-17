// React
import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Material UI pickers
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// Date stuff
import DateFnsUtils from '@date-io/date-fns'
import { Typography } from '@material-ui/core'

// db
import db from '../db/db'
import Person from '../db/Person'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: 7
    },
    accordion: {
        backgroundColor: theme.palette.action.hover,
        marginTop: 7
    }
}))

function MandatorySection(props) {

    const classes = useStyles(props)
    const { entry, setEntry, editMode } = props

    return (
        <React.Fragment>
            <TextField
                className={classes.textField}
                id="firstname-textbox"
                variant="outlined"
                label="First Name"
                aria-label="First Name"
                fullWidth
                required
                disabled={editMode}
                value={entry?.firstname || ''}
                onChange={event => {
                    if (!editMode) {
                        setEntry({
                            ...entry,
                            firstname: event.target.value
                        })
                    } 
                }}
            />
            <TextField
                className={classes.textField}
                id="lastname-textbox"
                variant="outlined"
                label="Last Name"
                fullWidth
                required
                disabled={editMode}
                value={entry?.lastname || ''}
                onChange={event => {
                    if (!editMode) {
                        setEntry({
                            ...entry,
                            lastname: event.target.value
                        })
                    }
                }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    required
                    inputProps={{ "data-testid": "birthdate-input", "aria-label": "Birthdate" }}
                    inputVariant="outlined"
                    label="Birthdate"
                    aria-label="Birthdate"
                    format="MM/dd/yyyy"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    value={entry?.birthdate || new Date()}
                    onChange={date => {
                        setEntry({
                            ...entry,
                            birthdate: date
                        })
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined" fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    label="Gender"
                    value={entry?.gender || ""}
                    inputProps={{ "data-testid": "gender-input" }}
                    onChange={event => {
                        setEntry({
                            ...entry,
                            gender: event.target.value
                        })
                    }}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    )

}

function OptionalSection(props) {

    const classes = useStyles()
    const { entry, setEntry } = props

    return (
        <Accordion
            className={classes.accordion}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>
                    Optional Fields
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="rank-textbox"
                            variant="outlined"
                            label="Rank"
                            fullWidth
                            value={entry?.rank || ''}
                            onChange={event => {
                                setEntry({
                                    ...entry,
                                    rank: event.target.value
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="organization-textbox"
                            variant="outlined"
                            label="Organization"
                            fullWidth
                            value={entry?.organization || ''}
                            onChange={event => {
                                setEntry({
                                    ...entry,
                                    organization: event.target.value
                                })
                            }}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )

}

function PersonDialog(props) {

    const { open, setOpen } = props
    const [entry, setEntry] = React.useState(props.entry || {birthdate: new Date()})
    const editMode = props.editMode || false
    let title = editMode ? "Edit a Member" : "Add a Member"

    async function handleSubmit() {
        if (editMode) {
            let person = new Person(entry)
            await person.save()
        }
        else {
            await db.PersonTable.add(entry)
        }
        setOpen(false)
        props.callback()
    }

    function close() {
        setOpen(false)
    }

    function isValidEntry() {
        if (!entry.firstname || entry.firstname.length < 1) {
            return false
        }
        if (!entry.lastname || entry.lastname?.length < 1) {
            return false
        }
        if (!entry.gender) {
            return false
        }
        return true
    }

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                {title}
            </DialogTitle>
            <DialogContent>
                <MandatorySection
                    entry={entry}
                    setEntry={setEntry}
                    editMode={editMode}
                />
                <OptionalSection
                    entry={entry}
                    setEntry={setEntry}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Close
                </Button>
                <Button
                    disabled={!isValidEntry()}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default PersonDialog
export {
    MandatorySection,
    OptionalSection
}