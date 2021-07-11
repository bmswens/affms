// React
import React from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

// Chart
import { Pie } from 'react-chartjs-2'

// Style
const useStyles = makeStyles((theme) => ({
    trendingIcon: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 48
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 64
        }
    }
}))


function PointsChart(props) {
    let { points, total } = props
    if (points === "exempt") {
        points = 0
    }
    let remainder = total - points

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <Pie
            options={options}
            data={{
                labels: [
                    "Earned",
                    "Remainder"
                ],
                datasets: [{
                    labels: [
                        "Earned",
                        "Remainder"
                    ],
                    data: [
                        points,
                        remainder
                    ],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                }]
            }}
        />
    )
}

function TrendingIcon(props) {

    const { oldPoints, newPoints } = props
    const classes = useStyles()

    if (newPoints instanceof String) {
        return null
    }
    else if (oldPoints > newPoints) {
        return (
            <TrendingDownIcon className={classes.trendingIcon} style={{ color: "red" }} />
        )
    }
    else {
        return (
            <TrendingUpIcon className={classes.trendingIcon} style={{ color: "green" }} />
        )
    }
}

function PointsDisplay(props) {

    const { oldPoints, newPoints, maxPoints, minPoints, title } = props

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    let displayPoints
    if (newPoints === 'exempt') {
        displayPoints = newPoints.toUpperCase()
    }
    else {
        displayPoints = newPoints.toFixed(1)
    }

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography variant={isSmall ? "h2" : "h1"} style={{ color: newPoints > minPoints ? "green" : "red" }}>
                    {displayPoints}
                    <TrendingIcon
                        newPoints={newPoints}
                        oldPoints={oldPoints}
                    />
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <PointsChart
                    points={newPoints}
                    total={maxPoints}
                />
            </Grid>
        </Grid>
    )
}


function FeedbackDialog(props) {

    let { oldTest, newTest } = props

    function handleClose() {
        props.setOpen(false)
    }


    return (
        <Dialog
            fullWidth
            onClose={handleClose}
            open={props.open}
            style={{ width: "100%" }}
            scroll="body"
        >
            <DialogTitle>
                <Typography align="center" variant="h4">
                    Results
                </Typography>
            </DialogTitle>
            <DialogContent align="center" >
                <PointsDisplay
                    title="Push Up Points"
                    newPoints={newTest.pushScore}
                    oldPoints={oldTest.pushScore}
                    maxPoints={20}
                    minPoints={0}
                />
                <PointsDisplay
                    title="Sit Up Points"
                    newPoints={newTest.sitScore}
                    oldPoints={oldTest.sitScore}
                    maxPoints={20}
                    minPoints={0}
                />
                <PointsDisplay
                    title="Cardio Points"
                    newPoints={newTest.runScore}
                    oldPoints={oldTest.runScore}
                    maxPoints={60}
                    minPoints={0}
                />
                <PointsDisplay
                    title="Total Points"
                    newPoints={newTest.score}
                    oldPoints={oldTest.score}
                    maxPoints={100}
                    minPoints={0}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default FeedbackDialog
