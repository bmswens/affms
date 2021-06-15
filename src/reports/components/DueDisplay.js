// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Date stuff
import { differenceInCalendarMonths } from 'date-fns';

// Custom
import { formatDate } from '../../people/PeoplePage';
import useStyles from './styles';

function DueDisplay(props) {

    const classes = useStyles();

    let { nextDue } = props;
    let dueDate = '';
    if (nextDue) {
        dueDate = formatDate(nextDue);
    }
    else {
        nextDue = new Date();
    }

    const now = new Date();
    const monthDifference = differenceInCalendarMonths(nextDue, now);

    let status;
    if (monthDifference >= 2) {
        status = 'Current';
    }
    else if (monthDifference === 1) {
        status = 'Due Soon';
    }
    else if (monthDifference === 0) {
        status = 'Due Now';
    }
    else {
        status = 'Overdue';
    }


    return (
        <React.Fragment>
            <Grid item xs={12} lg={4}>
                <Card className={classes.card}>
                    <CardHeader
                        title={"Due Date"} />
                    <CardContent>
                        <Typography variant="h3">
                            {dueDate}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Card className={classes.card}>
                    <CardHeader
                        title={"Status"} />
                    <CardContent>
                        <Typography variant="h2" className={classes[status.toLowerCase()]}>
                            {status}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default DueDisplay