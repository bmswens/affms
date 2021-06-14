// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid'
import { Paper, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

// Material UI Lab
import Autocomplete from '@material-ui/lab/Autocomplete';

// db
import db from '../db/db'

// smaller pieces
import {
    DueDisplay,
    LevelDisplay,
    PointDisplay,
    FitnessHistoryChart,
    FitnessHistoryGrid,
    StrengthAndWeakness
} from './SingleReportComponents'

function SingleReport(props) {

    const { target, officialOnly } = props
    const [tests, setTests] = React.useState([])
    const [mostRecent, setMostRecent] = React.useState({})
    const [penultimate, setPenultimate] = React.useState({})

    async function load() {
        let allTests = await db.TestTable.getByPerson(target, officialOnly)
        let testCount = allTests.length
        if (testCount >= 1) {
            setMostRecent(allTests[testCount - 1])
        }
        else {
            setMostRecent({})
        }
        if (testCount >= 2) {
            setPenultimate(allTests[testCount - 2])
        }
        else {
            setPenultimate({})
        }
        if (allTests.length) {
            setTests(allTests)
        }
        else {
            setTests([])
        }
    }

    React.useEffect(() => {
        if (target !== null) {
            load()
        }

    }, [target, officialOnly])

    if (target === null) {
        return null
    }
    else {
        return (
            <Grid 
                container 
                spacing={1} 
                alignItems="stretch" 
                align="center"
                style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }} 
            >
                <DueDisplay
                    nextDue={mostRecent.nextDue}
                />
                <LevelDisplay
                    points={mostRecent.score}
                />
                <PointDisplay
                    component="Run Time"
                    count={mostRecent.run}
                    points={mostRecent.runScore}
                    oldCount={penultimate.run}
                    oldPoints={penultimate.runScore}
                />
                <PointDisplay
                    component="Push Ups"
                    count={mostRecent.push}
                    points={mostRecent.pushScore}
                    oldCount={penultimate.push}
                    oldPoints={penultimate.pushScore}
                />
                <PointDisplay
                    component="Sit Ups"
                    count={mostRecent.sit}
                    points={mostRecent.sitScore}
                    oldCount={penultimate.sit}
                    oldPoints={penultimate.sitScore}
                />
                <PointDisplay
                    component="Composite Score"
                    count={mostRecent.score}
                    oldCount={penultimate.score}
                />
                <StrengthAndWeakness
                    tests={tests}
                />
                <FitnessHistoryChart
                    tests={tests}
                />
                <FitnessHistoryGrid
                    tests={tests}
                />
            </Grid>
        )
    }
}

function SingleReportPage(props) {

    const [people, setPeople] = React.useState([])
    const [target, setTarget] = React.useState(null)
    const [officialOnly, setOfficialOnly] = React.useState(false)
    const [status, setStatus] = React.useState('loading')

    React.useEffect(() => {
        db.PersonTable.all()
        .then(resp => {
            setPeople(resp)
            setStatus('loaded')
        })
    }, [props])

    return (
        <React.Fragment>
            <div style={{display: "none"}}>
                {status}
            </div>
            <Grid container spacing={1} style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={1} style={{ paddingLeft: 7, paddingRight: 7 }}>
                            <Grid item xs={8}>
                                <Autocomplete
                                    id="selector-box"
                                    options={people}
                                    getOptionLabel={(person) => `${person.firstname} ${person.lastname}`}
                                    renderInput={(params) => <TextField {...params} label="Target" variant="outlined" />}
                                    onChange={(event, newInputValue) => {
                                        setTarget(newInputValue)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="official-label">Official Only</InputLabel>
                                    <Select
                                        labelId="official-label"
                                        value={officialOnly}
                                        onChange={(event) => {
                                            setOfficialOnly(event.target.value)
                                        }}
                                        label="Official Only"
                                    >
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <SingleReport
                target={target}
                officialOnly={officialOnly}
            />
        </React.Fragment>
    )
}

export default SingleReportPage
export {
    SingleReport
}