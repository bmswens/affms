import React from 'react'

import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    useTheme,
    useMediaQuery
} from '@material-ui/core'

import { Bar } from 'react-chartjs-2'

import useStyles from './styles'


function GroupDueByMonth(props) {

    const { people } = props
    const classes = useStyles()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    let aspectRatio = 4
    if (isSmall) {
        aspectRatio = 2
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: aspectRatio,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {if (value % 1 === 0) {return value}}
                },
                max: people.length || 1
            },
            x: {
                beginAtZero: true,
            }
        },
    };
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let person of people) {
        let test = person.lastOfficial
        if (test === undefined) {
            continue
        }
        data[test.nextDue.getMonth()] += 1
    }
    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardHeader
                    title="Due Dates By Month"
                />
                <CardContent>
                    <Bar
                        options={options}
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            datasets: [
                                {
                                    data: data,
                                    label: 'Members',
                                    backgroundColor: 'dodgerblue',
                                    borderColor: 'black',
                                    borderWidth: 1
                                }
                            ]
                        }}
                    />
                </CardContent>
            </Card>
        </Grid>
    )

}

export default GroupDueByMonth