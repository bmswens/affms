// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'


function Main() {

    const theme = useTheme()
    let imageHeight = 590
    const isBig = useMediaQuery(theme.breakpoints.up('sm'))
    if (!isBig) {
        imageHeight = 221
    }

    return (
        <Card align="center">
            <CardHeader
                align="center"
                title="AFFMS"
                subheader="Air Force Fitness Mock System"
            />
            <CardMedia
                component="img"
                style={{
                    height: imageHeight,
                    width: 'auto',
                }}
                image={process.env.PUBLIC_URL + "/logo512.png"}
                title="AFFMS Logo"
            />
            <CardContent>
            </CardContent>
        </Card>
    )
}

function About() {

    const theme = useTheme()
    const isBig = useMediaQuery(theme.breakpoints.up('sm'))
    let contentAlign = "center"
    if (!isBig) {
        contentAlign = "left"
    }

    return (
        <Card>
            <CardHeader
                align="center"
                title="About"
            />
            <CardContent>
                <Typography variant="h6" align="center">
                    General
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    The Air Force Fitness Mock System (AFFMS) is a web app designed to help members track their PT scores
                    via both "Ad Hoc" scores and by creating profiles and tracking their scores over time
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    All scores are created using the standards released in 2021.
                </Typography>
                <Typography variant="h6" align="center">
                    Why
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    This web app is designed to help members adhere to AFI 36-2905 section 2.28.1:
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    [The Airman] maintains individual year-round physical fitness through self-directed and unit-based
                    PFPs, while maintaining proper nutrition standards. Airmen must know the block of time
                    within which their assessment is required in order to remain current in accordance with
                    Chapter 3.
                </Typography>
                <Typography variant="h6" align="center">
                    Usage
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    Users can either create profiles via the "Manage People" page accessed by the main menu.
                </Typography>
                <Typography variant="body2" align={contentAlign} >
                    Users can score tests via the button on the top right as either "Ad Hoc" (scores not saved), or
                    by associating to a profile
                </Typography>
                <Typography variant="body2" align={contentAlign}>
                    When tests are associated with a member, statics and reports can be viewed from the "Individual Reports" page.
                </Typography>
            </CardContent>
        </Card>
    )
}

function TextSection(props) {

    const { title, texts } = props
    const theme = useTheme()
    const isBig = useMediaQuery(theme.breakpoints.up('sm'))
    let contentAlign = "center"
    if (!isBig) {
        contentAlign = "left"
    }

    return (
        <React.Fragment>
            <Typography variant="h6" align="center">
                {title}
            </Typography>
            {texts.map(text => <Typography variant="body2" align={contentAlign} key={text}>{text}</Typography>)}
        </React.Fragment>
    )
}

function Tech() {

    return (
        <Card>
            <CardHeader
                align="center"
                title="The Technology"
            />
            <CardContent>
                <TextSection
                    title="React"
                    texts={[
                        "This applicaiton was created via create-react-app and is a single page application (SPA).",
                        "SPAs primarily rely on JavaScript to modify the Document Object Model (DOM)."
                    ]}
                />
                <TextSection
                    title="IndexedDB"
                    texts={[
                        "This application utilizes IndexedDB to store and retrieve information.",
                        "This means that all data (i.e people and tests) is stored locally. While it is persistent to the browser, logging into the app from another computer will only show results stored on that computer."
                    ]}
                />
                <TextSection
                    title="Progressive Web App"
                    texts={[
                        "This application is intended to be a Progressive Web App.",
                        "This means that most of the app is cached upon intial load, allowing offline access and usage as a \"native app\" on my devices."
                    ]}
                />
            </CardContent>
        </Card>
    )

}



function Homepage() {

    return (
        <Grid container spacing={1} justify="center" alignItems="center" style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}>
            <Grid item xs={12}>
                <Main />
            </Grid>
            <Grid item xs={12}>
                <About />
            </Grid>
            <Grid item xs={12}>
                <Tech />
            </Grid>
        </Grid>
    )

}

export default Homepage