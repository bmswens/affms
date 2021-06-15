import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

function StrengthAndWeakness(props) {

    const classes = useStyles();

    let { tests } = props;
    if (!tests) {
        tests = [];
    }
    const scores = {
        runScore: [],
        sitScore: [],
        pushScore: []
    };
    let labels = {
        runScore: "1.5 Mile Run",
        sitScore: "Sit Ups",
        pushScore: "Push Ups"
    };
    let maxPoints = {
        runScore: 60,
        sitScore: 20,
        pushScore: 20
    };

    for (let test of tests) {
        for (let component in scores) {
            let score = test[component];
            if (score !== 'exempt') {
                scores[component].push(score);
            }
        }
    }

    let weakest = {
        label: "No Test Data",
        value: 101
    };
    let strongest = {
        label: "No Test Data",
        value: -1
    };
    for (let component in scores) {
        let total = scores[component].reduce((accumulator, current) => accumulator + current, 0);
        let average = total / scores[component].length;
        let asPercentage = (average / maxPoints[component]) * 100;
        console.log(component, average, maxPoints[component], asPercentage)
        if (asPercentage > strongest.value) {
            strongest.label = labels[component];
            strongest.value = asPercentage;
        }
        else if (asPercentage === strongest.value) {
            strongest.label += `, ${labels[component]}`;
        }
        if (asPercentage < weakest.value) {
            weakest.label = labels[component];
            weakest.value = asPercentage;
        }
        else if (asPercentage === weakest.value) {
            weakest.value += `, ${labels[component]}`;
        }
    }


    return (
        <React.Fragment>
            <Grid item xs={12} lg={6}>
                <Card className={classes.card}>
                    <CardHeader
                        id="StrongestComponentHeader"
                        title="Strongest Component" />
                    <CardContent>
                        <Typography
                            aria-labelledby="StrongestComponentHeader"
                        >
                            {strongest.label}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className={classes.card}>
                    <CardHeader
                        id="WeakestComponentHeader"
                        title="Weakest Component" />
                    <CardContent>
                        <Typography
                            aria-labelledby="WeakestComponentHeader"
                        >
                            {weakest.label}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default StrengthAndWeakness