// React
import React from 'react'
// Material UI
import {
    Paper,
    Grid,
    TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
// custom
import db from '../db/db'


function OrgSelector(props) {

    const { target, setTarget } = props
    const [orgs, setOrgs] = React.useState([])
    const [status, setStatus] = React.useState('loading')

    React.useEffect(() => {
        db.OrgTable.getAll()
            .then(resp => {
                setOrgs(resp)
                setStatus('loaded')
            })
    }, [])


    return (
        <Grid
            container
            spacing={1}
            style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}
        >
            <div
                data-testid="org-selector-status"
                style={{ display: 'none' }}
            >
                {status}
            </div>
            <Paper
                style={{ paddingLeft: 7, paddingRight: 7 }}
            >
                <Grid container spacing={1}>
                    <Grid item xs/>
                    <Grid item xs={8}>
                        <Autocomplete
                            id="org-selector-box"
                            options={orgs}
                            getOptionLabel={org => `${org}`}
                            renderInput={(params) => <TextField {...params} label="Target" variant="outlined" />}
                            value={target}
                            onChange={(event, newInputValue) => {
                                setTarget(newInputValue)
                            }}
                        />
                    </Grid>
                    <Grid item xs/>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default OrgSelector