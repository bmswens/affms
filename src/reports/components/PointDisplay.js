import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Icons
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

import { useStyles } from './styles';

function TrendingIcon(props) {

    const classes = useStyles()
    const { newValue, oldValue } = props

    if (oldValue === undefined) {
        return null
    }
    else if (newValue > oldValue) {
        return (
            <TrendingUpIcon
                titleAccess="Trending Up Icon"
                className={`${classes.current} ${classes.trendingIcon}`}
            />
        )
    }
    else if (newValue < oldValue) {
        return (
            <TrendingDownIcon
                titleAccess="Trending Down Icon"
                className={`${classes.overdue} ${classes.trendingIcon}`}
            />
        )
    }
    else {
        return (
            <TrendingFlatIcon
                titleAccess="Trending Flat Icon" 
                className={classes.trendingIcon} 
            />
        )
    }
}


function PointDisplay(props) {

    const classes = useStyles();

    const [showFront, setShowFront] = React.useState(true);
    const {
        component,
        count,
        points,
        oldCount,
        oldPoints
    } = props;

    let titleDisplay;
    let contentDisplay;
    let trendDisplay;
    if (showFront) {
        titleDisplay = `${component}`;
        contentDisplay = count;
        trendDisplay = <TrendingIcon newValue={count} oldValue={oldCount} />;
    }
    else {
        titleDisplay = `${component} Points`;
        contentDisplay = points;
        trendDisplay = <TrendingIcon newValue={points} oldValue={oldPoints} />;
    }
    let cardProps
    let className = 'card'
    if (points !== undefined) {
        cardProps = {
            role: 'button',
            onClick: () => setShowFront(!showFront)
        }
        className = 'clickableCard'
    }
    

    return (
        <Grid item xs={12} lg={3}>
            <Card
                aria-label={`${component} Card`}
                className={classes[className]}
                {...cardProps}
            >
                <CardHeader
                    title={titleDisplay}
                    titleTypographyProps={{
                        variant: "h5"
                    }} />
                <CardContent>
                    <Typography variant="h2">
                        {contentDisplay}{trendDisplay}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PointDisplay
export {
    TrendingIcon
}