import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// Charts
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';


import { useStyles } from './styles';

const lineColorFunctions = {
    compositeScore: function (context) {
        let index = context.dataIndex
        let value = context.dataset.data[index]
        return value >= 75 ? "green" : value == undefined ? "green" : "red"
    },
    runScore: function (context) {
        let index = context.dataIndex
        let value = context.dataset.data[index]
        return value >= 42.3 ? "green" : value == undefined ? "green" : "red"
    },
    upScore: function (context) {
        let index = context.dataIndex
        let value = context.dataset.data[index]
        return value >= 10 ? "green" : value == undefined ? "green" : "red"
    }
}

function FitnessHistoryChart(props) {

    const classes = useStyles();

    const { tests } = props;
    // data to pull out
    let dates = [];
    let runPoints = [];
    let pushPoints = [];
    let sitPoints = [];
    let scores = [];
    for (let test of tests) {
        dates.push(test.date);
        runPoints.push(test.runScore);
        pushPoints.push(test.pushScore);
        sitPoints.push(test.sitScore);
        scores.push(test.score);
    }

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Composite Score',
                data: scores,
                fill: false,
                borderColor: "black",
                backgroundColor: lineColorFunctions.compositeScore,
                pointRadius: 15,
                pointStyle: 'rect'
            },
            {
                label: 'Push Up Points',
                data: pushPoints,
                fill: false,
                borderColor: "black",
                backgroundColor: lineColorFunctions.upScore,
                pointRadius: 10,
                pointStyle: 'rectRounded'
            },
            {
                label: 'Sit Up Points',
                data: sitPoints,
                fill: false,
                borderColor: "black",
                backgroundColor: lineColorFunctions.upScore,
                pointRadius: 10,
            },
            {
                label: 'Run Points',
                data: runPoints,
                fill: false,
                borderColor: "black",
                backgroundColor: lineColorFunctions.runScore,
                pointRadius: 10,
                pointStyle: 'triangle'
            }
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            },
            x: {
                offset: true,
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3
    };


    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardHeader
                    title="Fitness History Chart" />
                <CardContent>
                    <Line
                        data={data}
                        options={options} />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default FitnessHistoryChart
export {
    lineColorFunctions
}