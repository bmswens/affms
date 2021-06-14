// React
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Material UI icons
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

// Material UI lab
import { DataGrid } from '@material-ui/data-grid';

// Charts
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// date stuff
import { differenceInCalendarMonths } from 'date-fns'
import { formatDate } from '../people/PeoplePage'

// Style
const useStyles = makeStyles((theme) => ({
    current: {
        color: theme.palette.success.dark
    },
    "due soon": {
        color: theme.palette.warning.dark
    },
    due: {
        color: theme.palette.warning.dark
    },
    overdue: {
        color: theme.palette.error.dark
    },
    card: {
        height: "100%"
    }
}))

function DueDisplay(props) {

    const classes = useStyles()

    let { nextDue } = props
    let dueDate = ''
    if (nextDue) {
        dueDate = formatDate(nextDue)
    }
    else {
        nextDue = new Date()
    }

    const now = new Date()
    const monthDifference = differenceInCalendarMonths(nextDue, now)

    let status
    if (monthDifference >= 2) {
        status = 'Current'
    }
    else if (monthDifference === 1) {
        status = 'Due Soon'
    }
    else if (monthDifference === 0) {
        status = 'Due Now'
    }
    else {
        status = 'Overdue'
    }


    return (
        <React.Fragment>
            <Grid item xs={12} lg={4}>
                <Card className={classes.card} >
                    <CardHeader
                        title={"Due Date"}
                    />
                    <CardContent>
                        <Typography variant="h3">
                            {dueDate}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Card className={classes.card} >
                    <CardHeader
                        title={"Status"}
                    />
                    <CardContent>
                        <Typography variant="h2" className={classes[status.toLowerCase()]}>
                            {status}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

function LevelDisplay(props) {

    const classes = useStyles()

    const { points } = props
    let text = "No Test Data"
    let style
    if (!points || points < 75) {
        text = 'Unsatisfactory'
        style = classes.overdue
    }
    else if ( 75 <= points && points <= 80) {
        text = 'Satisfactory'
        style = classes["due soon"]
    }
    else if (80 < points && points < 90) {
        text = 'Satisfactory'
        style = classes.current
    }
    else if (90 <= points) {
        text = 'Excellent'
        style = classes.current
    }

    return (
        <Grid item xs={12} lg={4}>
            <Card className={classes.card} >
                <CardHeader
                    title={"Fitness Level"}
                />
                <CardContent>
                    <Typography variant="h3" className={style}>
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

function TrendingIcon(props) {

    const classes = useStyles()
    const { newValue, oldValue } = props

    if (!oldValue) {
        return null
    }
    else if (newValue > oldValue) {
        return (
            <TrendingUpIcon
                titleAccess="Trending Up Icon"
                className={classes.current}
            />
        )
    }
    else if (newValue < oldValue) {
        return (
            <TrendingDownIcon
                titleAccess="Trending Down Icon"
                className={classes.overdue}
            />
        )
    }
    else {
        return (
            <TrendingFlatIcon titleAccess="Trending Flat Icon"/>
        )
    }
}

function PointDisplay(props) {

    const classes = useStyles()

    const [showFront, setShowFront] = React.useState(true)
    const {
        component,
        count,
        points,
        oldCount,
        oldPoints
    } = props

    let titleDisplay
    let contentDisplay
    let trendDisplay
    if (showFront) {
        titleDisplay = `${component}`
        contentDisplay = count
        trendDisplay = <TrendingIcon newValue={count} oldValue={oldCount} />
    }
    else {
        titleDisplay = `${component} Points`
        contentDisplay = points
        trendDisplay = <TrendingIcon newValue={points} oldValue={oldPoints} />
    }

    return (
        <Grid item xs={12} lg={3}>
            <Card
                role="button"
                aria-label={`${component} Card`}
                onClick={() => setShowFront(!showFront)}
                className={classes.card}
            >
                <CardHeader
                    title={titleDisplay}
                    titleTypographyProps={{
                        variant: "h5"
                    }}
                />
                <CardContent>
                    <Typography variant="h3">
                        {contentDisplay}{trendDisplay}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

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

    const classes = useStyles()

    const { tests } = props
    // data to pull out
    let dates = []
    let runPoints = []
    let pushPoints = []
    let sitPoints = []
    let scores = []
    for (let test of tests) {
        dates.push(test.date)
        runPoints.push(test.runScore)
        pushPoints.push(test.pushScore)
        sitPoints.push(test.sitScore)
        scores.push(test.score)
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
    }

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
    }


    return (
        <Grid item xs={12}>
            <Card className={classes.card} >
                <CardHeader
                    title="Fitness History Chart"
                />
                <CardContent>
                    <Line
                        data={data}
                        options={options}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

function StrengthAndWeakness(props) {

    const classes = useStyles()

    let { tests } = props
    if (!tests) {
        tests = []
    }
    const scores = {
        runPoints: [],
        sitPoints: [],
        pushPoints: []
    }
    let labels = {
        runPoints: "1.5 Mile Run",
        sitPoints: "Sit Ups",
        pushPoints: "Push Ups"
    }
    let maxPoints = {
        runPoints: 60,
        sitPoints: 20,
        pushPoints: 20
    }

    for (let test of tests) {
        for (let component in scores) {
            let score = test[component]
            if (score !== 'exempt') {
                scores[component].push(score)
            }
        }
    }

    let weakest = {
        label: "No Test Data",
        value: 101
    }
    let strongest = {
        label: "No Test Data",
        value: -1
    }
    for (let component in scores) {
        let total = scores[component].reduce((accumulator, current) => accumulator + current, 0)
        let average = total / scores[component].length
        let asPercentage = (average / maxPoints[component]) * 100
        if (asPercentage > strongest.value) {
            strongest.label = labels[component]
            strongest.value = asPercentage
        }
        else if (asPercentage == strongest.value) {
            strongest.label += `, ${labels[component]}`
        }
        if (asPercentage < weakest.value) {
            weakest.label = labels[component]
            weakest.value = asPercentage
        }
        else if (asPercentage == strongest.value) {
            weakest.value += `, ${labels[component]}`
        }
    }


    return (
        <React.Fragment>
            <Grid item xs={12} lg={6}>
                <Card className={classes.card} >
                    <CardHeader
                        id="StrongestComponentHeader"
                        title="Strongest Component"
                    />
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
            <Card className={classes.card} >
                    <CardHeader
                        id="WeakestComponentHeader"
                        title="Weakest Component"
                    />
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
    )
}

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

    const classes = useStyles()

    const { tests } = props
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
    ]

    return (
        <Grid item xs={12}>
            <Card className={classes.card} >
                <CardHeader
                    title="Fitness History Grid"
                />
                <CardContent>
                <DataGrid
                    rows={tests}
                    columns={columns}
                    autoHeight
                />
                </CardContent>
            </Card>
        </Grid>
    )
}

export {
    DueDisplay,
    LevelDisplay,
    PointDisplay,
    TrendingIcon,
    FitnessHistoryChart,
    lineColorFunctions,
    StrengthAndWeakness,
    FitnessHistoryGrid
}