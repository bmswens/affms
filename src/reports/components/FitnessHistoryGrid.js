import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid } from '@material-ui/data-grid';
import { useStyles } from './styles';

function getFitLevel(params) {
    let score = params.row.totalPoints
    if (score >= 90) {
        return "Excellent"
    }
    else if (score >= 75) {
        return "Satisfactory"
    }
    else if (score === "EXEMPT") {
        return "EXEMPT"
    }
    else {
        return 'Unsatisfactory'
    }
}

function FitnessHistoryGrid(props) {

    const classes = useStyles();

    const { tests } = props;
    let columns = [
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            type: 'date',
        },
        {
            field: "run",
            headerName: "Aerobic Time",
            flex: 1,
            type: 'number',
            sortable: false
        },
        {
            field: "runScore",
            headerName: "Aerobic Score",
            flex: 1,
            type: 'number',
        },
        {
            field: "push",
            headerName: "Push Ups",
            flex: 1,
            type: 'number',
        },
        {
            field: "pushScore",
            headerName: "Push Ups Score",
            flex: 1,
            type: 'number',
        },
        {
            field: "sit",
            headerName: "Sit Ups",
            flex: 1,
            type: 'number',
        },
        {
            field: "sitScore",
            headerName: "Sit Ups Score",
            flex: 1,
            type: 'number',
        },
        {
            field: "score",
            headerName: "Composite Score",
            flex: 1,
            type: 'number',
        },
        {
            field: "pass",
            headerName: "Passing Score",
            flex: 1,
            type: 'boolean',
        },
        {
            field: "fitLevel",
            headerName: "Fit Level",
            flex: 1,
            valueGetter: getFitLevel
        }
    ];

    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardHeader
                    title="Fitness History Grid" />
                <CardContent>
                    <DataGrid
                        rows={tests}
                        columns={columns}
                        autoHeight />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default FitnessHistoryGrid
export {
    getFitLevel
}