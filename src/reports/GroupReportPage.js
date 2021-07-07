// React
import React from 'react'
// Material UI
import {
    Grid
} from '@material-ui/core'

// components
import GroupDueDisplay from './components/GroupDueDisplay'
import GroupLevelDisplay from './components/GroupLevelDisplay'
import GroupDueByMonth from './components/GroupDueByMonth'
import StrengthAndWeaknesses from './components/StrengthAndWeakness'
import OrgSelector from './OrgSelector'

import db from '../db/db'

function GroupReport(props) {

    const { target } = props
    const [people, setPeople] = React.useState([])
    const [allTests, setAllTests] = React.useState([])
    const [status, setStatus] = React.useState('loading')

    async function load(tgt) {
        let ppl = await db.OrgTable.getByOrg(tgt)
        for (let person of ppl) {
            person.tests = await db.TestTable.getByPerson(person)
            person.tests.reverse()
            person.lastOfficial = undefined
            for (let test of person.tests) {
                if (test.official === true && person.lastOfficial === undefined) {
                    person.lastOfficial = test
                    break
                }
            }
        }
        setPeople(ppl)
        let tests = await db.TestTable.all()
        setAllTests(tests)
        setStatus('loaded')
    }

    React.useEffect(() => {
        if (target !== null) {
            load(target)
        }
    }, [target])

    if (target === null) {
        return null
    }
    else {
        return(
            <Grid
                container
                spacing={1}
                style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}
                alignItems="stretch" 
                align="center"
            >
                <div
                    data-testid="group-reports-status"
                    style={{display: 'none'}}
                >
                    {status}
                </div>
                <GroupDueDisplay
                    people={people}
                />
                <GroupLevelDisplay
                    people={people}
                />
                <GroupDueByMonth
                    people={people}
                />
                <StrengthAndWeaknesses
                    tests={allTests}
                />
            </Grid>
        )
    }
}

function GroupReportPage(props) {

    const [target, setTarget] = React.useState(null)

    return(
        <React.Fragment>
            <OrgSelector
                target={target}
                setTarget={setTarget}
            />
            <GroupReport
                target={target}
            />
        </React.Fragment>
    )
}

export default GroupReportPage
export {
    GroupReport
}