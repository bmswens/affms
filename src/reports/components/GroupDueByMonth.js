import React from 'react'

import {
    Card,
    CardHeader,
    CardContent,
    Grid
} from '@material-ui/core'

import { Bar } from 'react-chartjs-2'

import useStyles from './styles'


function GroupDueByMonth(props) {

    const { people } = props
    const classes = useStyles()

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
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
                            dataset: [
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