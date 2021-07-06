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
        let excellent = 0
        let sat = 0
        let borderline = 0
        let unsat = 0
        let noData = 0
        for (let person of people) {
            if (person.lastOfficial === undefined) {
                noData += 1
            }
            else {
                let test = person.lastOfficial
                if (test.score >= 90) {
                    excellent += 1
                }
                else if (80 <= test.score && test.score < 90) {
                    sat += 1
                }
                else if (75 <= test.score && test.score < 80) {
                    borderline += 1
                }
                else {
                    unsat += 1
                }
            }
        }
        return (
            <Pie
                options={options}
                data={{
                    labels: [
                        "Excellent",
                        "Satisfactory",
                        "Borderline",
                        "Unsatisfactory",
                        "NO DATA"
                    ],
                    datasets: [{
                        labels: [
                            "Excellent",
                            "Satisfactory",
                            "Borderline",
                            "Unsatisfactory",
                            "NO DATA"
                        ],
                        data: [
                            excellent,
                            sat,
                            borderline,
                            unsat,
                            noData
                        ],
                        backgroundColor: [
                            "green",
                            "yellowgreen",
                            "yellow",
                            "red",
                            "orangered"
                        ]
                    }]
                }}
            />
        )
    }
}


function GroupLevelDisplay(props) {

    const { people } = props
    const classes = useStyles()

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardHeader
                    title="Fitness Levels"
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

export default GroupLevelDisplay