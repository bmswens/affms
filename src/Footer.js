// React
import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {
    Tooltip
} from '@material-ui/core'

// Icons
import EmailIcon from '@material-ui/icons/Email'
import GitHubIcon from '@material-ui/icons/GitHub'
import BugReportIcon from '@material-ui/icons/BugReport'

function Footer(props) {

    let currentYear = (new Date()).getFullYear()

    return (
        <Grid container spacing={1} style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }} justify="center">
            <Grid item xs={12} md={8} >
                <Card>
                    <CardContent align="center">
                        <Typography>
                            AFFMS.app is not affiliated with the United States
                            Air Force or any component of the United States Department of Defense.
                            All product and company names are trademarks or registered trademarks
                            of their respective holders. Use of them does not imply any affiliation
                            with or endorsement by them.
                        </Typography>
                        <Typography>
                            © {currentYear} Brandon Swenson
                        </Typography>
                        <Tooltip title="Contact Us">
                            <IconButton
                                aria-label="Contact Us"
                            >
                                <EmailIcon />
                            </IconButton>
                        </Tooltip>
                        <a
                            href="https://github.com/bmswens/affms"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Tooltip title="Find Us On Github">
                                <IconButton
                                    aria-label="Find Us On Github"
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Tooltip>
                        </a>
                        <a
                            href="https://github.com/bmswens/affms/issues/new"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Tooltip title="Report A Bug / Request A Feature">
                                <IconButton
                                    aria-label="Report A Bug"
                                >
                                    <BugReportIcon />
                                </IconButton>
                            </Tooltip>
                        </a>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

}

export default Footer