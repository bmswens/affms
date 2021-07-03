// React
import React from 'react'
// Material UI
import {
    CardHeader,
    Typography,
    CardContent,
    Grid,
    Card
} from '@material-ui/core'
// Date stuff
import { differenceInCalendarMonths } from 'date-fns';
// Chart
import { Pie } from 'react-chartjs-2'
// custom
import useStyles from './styles'

function Content(props) {
    const { tests } = props
    if (tests === undefined || tests.length === 0) {
        return (
            <Typography variant="h3">
                NO DATA
            </Typography>
        )
    }
    else {
        const options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
        let current = 0
        let dueSoon = 0
        let due = 0
        let overdue = 0
        const now = new Date()
        for (let test of tests) {
            let monthDifference = differenceInCalendarMonths(test.nextDue, now)
            if (monthDifference >= 2) {
                current += 1
            }
            else if (monthDifference === 1) {
                dueSoon += 1
            }
            else if (monthDifference === 0) {
                due += 1
            }
            else {
                overdue += 1
            }
        }
        return (
            <Pie
                options={options}
                data={{
                    labels: [
                        "Current",
                        "Due Soon",
                        "Due",
                        "Overdue"
                    ],
                    datasets: [{
                        labels: [
                            "Current",
                            "Due Soon",
                            "Due",
                            "Overdue"
                        ],
                        data: [
                            current,
                            dueSoon,
                            due,
                            overdue
                        ],
                        backgroundColor: [
                            "green",
                            "yellow",
                            "orange",
                            "red"
                        ]
                    }]
                }}
            />
        )
    }
}


function GroupDueDisplay(props) {

    const { tests } = props
    const classes = useStyles()

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardHeader
                    title="Currency Status"
                />
                <CardContent>
                    <Content
                        tests={tests}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

export default GroupDueDisplay