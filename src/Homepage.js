// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';


function About() {

    return (
        <Card>
            <CardHeader
                title="About"
            />
            <CardContent>
                <Typography variant="body2">
                    Lorem Ipsum
                </Typography>
            </CardContent>
        </Card>
    )

}

function Tech() {

    return (
        <Card>
            <CardHeader
                title="The Technology"
            />
            <CardContent>
                <Typography variant="body2">
                    Lorem Ipsum
                </Typography>
            </CardContent>
        </Card>
    )

}

function Links() {

    return (
        <Card>
            <CardHeader
                title="Useful Links"
            />
            <CardContent>
                <Typography variant="body2">
                    Lorem Ipsum
                    </Typography>
            </CardContent>
        </Card>
    )

}

function Contact() {

    return (
        <Card>
            <CardHeader
                title="Contact Us"
            />
            <CardContent>
                <Typography variant="body2">
                    Lorem Ipsum
                </Typography>
            </CardContent>
        </Card>
    )

}

function Homepage() {

    return (
        <Grid container spacing={1} justify="center" alignItems="center" style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}>
            <Grid item xs={12}>
                <About />
            </Grid>
            <Grid item xs={12}>
                <Tech />
            </Grid>
            <Grid item xs={12}>
                <Links />
            </Grid>
            <Grid item xs={12}>
                <Contact />
            </Grid>
        </Grid>
    )

}

export default Homepage