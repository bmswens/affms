// React
import React from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Material UI Lab
import Autocomplete from '@material-ui/lab/Autocomplete';

// Material UI pickers
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// Date stuff
import DateFnsUtils from '@date-io/date-fns'

// Custom
import db from '../db/db'
import Test from '../db/Test'
import FeedbackDialog from './FeedbackDialog'


function cleanUps(up) {
    if (String(up).toLowerCase() === 'exempt') {
        return 'exempt'
    }
    else if (!up || !Number.isInteger(Number(up))) {
        return false
    }
    else {
        return Number(up)
    }
}

function cleanTime(time) {
    if (String(time).toLowerCase() === 'exempt') {
        return 'exempt'
    }
    else if (String(time).split(':').length !== 2) {
        return undefined
    }
    let checkTime = String(time).split(':')
    for (let t of checkTime) {
        if (!Number.isInteger(Number(t)) || Number(t) > 60) {
            return undefined
        }
    }
    return time
}


function TestEntryDialog(props) {

    const [entry, setEntry] = React.useState({
        date: new Date(),
        official: false
    })

    const [people, setPeople] = React.useState([])
    const [status, setStatus] = React.useState('loading')

    async function load() {
        let tempPeople = await db.PersonTable.all()
        tempPeople.unshift({
            firstname: 'Ad',
            lastname: 'Hoc',
            getAge: function() {
                return this.age
            }
        })
        setPeople(tempPeople)
        setStatus('loaded')
    }

    React.useEffect(() => {
        load()
    }, [props.open])

    const [feedbackOpen, setFeedbackOpen] = React.useState(false)
    const [oldTest, setOldTest] = React.useState({})
    const [newTest, setNewTest] = React.useState({})


    function cleanEntry() {
        let output = {
            date: entry.date,
            push: cleanUps(entry.push),
            sit: cleanUps(entry.sit),
            run: cleanTime(entry.run),
            age: entry.testee?.getAge(),
            gender: entry.testee?.gender,
            firstname: entry.testee?.firstname,
            lastname: entry.testee?.lastname,
            official: entry.official
        }
        for (let key in output) {
            if (output[key] === undefined) {
                return false
            }
        }
        if (entry.testee === undefined) {
            return false
        }
        return output
    }

    function handleClose() {
        props.setOpen(false)
    }

    async function submit() {
        let data = {
            ...cleanEntry(),
        }
        let lastTest = {}
        let thisTest = {}
        if (entry.testee?.firstname !== 'Ad' && entry.testee?.lastname !== 'Hoc') {
            let previousTests = await db.TestTable.getByPerson(entry.testee)
            if (previousTests.length) {
                lastTest = previousTests[previousTests.length - 1]
            }
            thisTest = await db.TestTable.add(data)
        }
        else {
            thisTest = new Test(data)
            await thisTest.calculateScore()
        }
        setEntry({
            date: new Date()
        })
        setOldTest(lastTest)
        setNewTest(thisTest)
        handleClose()
        setFeedbackOpen(true)
    }

    const [genderField, setGenderField] = React.useState(null)
    const [ageField, setAgeField] = React.useState(null)
    React.useEffect(() => {
        if (entry.testee?.firstname === 'Ad' && entry.testee?.lastname === 'Hoc') {
            setGenderField((
                <FormControl variant="outlined" fullWidth required style={{ marginTop: 7 }}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        aria-labelledby="gender-label"
                        aria-label="Gender"
                        id="gender-select"
                        value={entry.testee?.gender || ''}
                        onChange={(event) => {
                            setEntry({
                                ...entry,
                                testee: {
                                    ...entry.testee,
                                    gender: event.target.value
                                }
                            })
                        }}
                        label="Gender"
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>
            ))
            setAgeField((
                <TextField
                    required
                    style={{ marginTop: 7 }}
                    variant="outlined"
                    label="Age"
                    id="age-field"
                    fullWidth
                    value={entry.testee?.age || ''}
                    onChange={(event) => {
                        setEntry({
                            ...entry,
                            testee: {
                                ...entry.testee,
                                age: event.target.value
                            }
                        })
                    }}
                    error={Boolean(entry.testee?.age) && Number.isNaN(Number(entry.testee?.age))}
                />
            ))
        }
        else {
            setGenderField(null)
            setAgeField(null)
        }
    }, [entry])

    return (
        <React.Fragment>
            <div
                data-testid="test-entry-status"
                style={{ display: "none" }}
            >
                {status}
            </div>
            <Dialog
                fullWidth
                onClose={handleClose}
                open={props.open}
                style={{ width: "100%" }}
                scroll="body"
            >
                <DialogTitle>
                    <Typography align="center">
                        Add New Test Entry
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        id="testee-box"
                        options={people}
                        getOptionLabel={(person) => `${person.firstname} ${person.lastname}`}
                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Test Taker" variant="outlined" />}
                        onChange={(event, newInputValue) => {
                            setEntry({
                                ...entry,
                                testee: newInputValue
                            })
                        }}
                    />
                    {genderField}
                    {ageField}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-select-dialog"
                            fullWidth
                            inputVariant="outlined"
                            label="Date"
                            format="MM/dd/yyyy"
                            value={entry.date || ''}
                            onChange={(date) => {
                                setEntry({
                                    ...entry,
                                    date: date
                                })
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="official-label">Official Test</InputLabel>
                        <Select
                            labelId="official-label"
                            id="offial-select"
                            value={entry.official || false}
                            onChange={(event) => {
                                setEntry({
                                    ...entry,
                                    official: event.target.value
                                })
                            }}
                            label="Official Test"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        style={{ marginTop: 7 }}
                        variant="outlined"
                        label="Push-ups"
                        id="push-ups-field"
                        helperText='Integer or "EXEMPT"'
                        fullWidth
                        value={entry.push || ''}
                        onChange={(event) => {
                            setEntry({
                                ...entry,
                                push: event.target.value
                            })
                        }}
                        error={entry.push && !cleanUps(entry.push)}
                    />
                    <TextField
                        style={{ marginTop: 7 }}
                        variant="outlined"
                        label="Sit-ups"
                        id="sit-ups-field"
                        helperText='Integer or "EXEMPT"'
                        fullWidth
                        value={entry.sit || ''}
                        onChange={(event) => {
                            setEntry({
                                ...entry,
                                sit: event.target.value
                            })
                        }}
                        error={entry.sit && !cleanUps(entry.sit)}
                    />
                    <TextField
                        style={{ marginTop: 7 }}
                        variant="outlined"
                        label="Run Time"
                        id="run-field"
                        helperText="In MM:SS format."
                        fullWidth
                        value={entry.run || ''}
                        onChange={(event) => {
                            setEntry({
                                ...entry,
                                run: event.target.value
                            })
                        }}
                        error={entry.run && !cleanTime(entry.run)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                    >
                        Close
                </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!cleanEntry()}
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <FeedbackDialog
                oldTest={oldTest}
                newTest={newTest}
                open={feedbackOpen}
                setOpen={setFeedbackOpen}
            />
        </React.Fragment>
    )
}


export default TestEntryDialog