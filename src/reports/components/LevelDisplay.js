import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

function LevelDisplay(props) {

    const classes = useStyles();

    const { points } = props;
    let text = "No Test Data";
    let style;
    if (!points || points < 75) {
        text = 'Unsatisfactory';
        style = classes.overdue;
    }
    else if (75 <= points && points <= 80) {
        text = 'Satisfactory';
        style = classes["due soon"];
    }
    else if (80 < points && points < 90) {
        text = 'Satisfactory';
        style = classes.current;
    }
    else if (90 <= points) {
        text = 'Excellent';
        style = classes.current;
    }

    return (
        <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
                <CardHeader
                    title={"Fitness Level"} />
                <CardContent>
                    <Typography variant="h3" className={style}>
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default LevelDisplay