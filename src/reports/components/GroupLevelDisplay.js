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
        let excellent = 0
        let sat = 0
        let borderline = 0
        let unsat = 0
        for (let test of tests) {
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
        return (
            <Pie
                options={options}
                data={{
                    labels: [
                        "Excellent",
                        "Satisfactory",
                        "Borderline",
                        "Unsatisfactory"
                    ],
                    datasets: [{
                        labels: [
                            "Excellent",
                            "Satisfactory",
                            "Borderline",
                            "Unsatisfactory"
                        ],
                        data: [
                            excellent,
                            sat,
                            borderline,
                            unsat
                        ],
                        backgroundColor: [
                            "green",
                            "yellowgreen",
                            "yellow",
                            "red"
                        ]
                    }]
                }}
            />
        )
    }
}


function GroupLevelDisplay(props) {

    const { tests } = props
    const classes = useStyles()

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardHeader
                    title="Fitness Levels"
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

export default GroupLevelDisplay