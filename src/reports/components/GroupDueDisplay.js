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
    const { people } = props
    if (people === undefined || people.length === 0) {
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
        let noData = 0
        const now = new Date()
        for (let person of people) {
            if (person.lastOfficial === undefined) {
                noData += 1
            }
            else {
                let monthDifference = differenceInCalendarMonths(person.lastOfficial.nextDue, now)
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
        }
        return (
            <Pie
                options={options}
                data={{
                    labels: [
                        "Current",
                        "Due Soon",
                        "Due",
                        "Overdue",
                        "NO DATA"
                    ],
                    datasets: [{
                        labels: [
                            "Current",
                            "Due Soon",
                            "Due",
                            "Overdue",
                            "NO DATA"
                        ],
                        data: [
                            current,
                            dueSoon,
                            due,
                            overdue,
                            noData
                        ],
                        backgroundColor: [
                            "green",
                            "yellow",
                            "orange",
                            "red",
                            "orangered"
                        ]
                    }]
                }}
            />
        )
    }
}


function GroupDueDisplay(props) {

    const { people } = props
    const classes = useStyles()

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardHeader
                    title="Currency Status"
                />
                <CardContent>
                    <Content
                        people={people}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

export default GroupDueDisplay