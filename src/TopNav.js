// React
import React from 'react';

// React Router
import { Link } from "react-router-dom"

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'

// Material UI Icons
import MenuIcon from '@material-ui/icons/Menu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssessmentIcon from '@material-ui/icons/Assessment'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LinkIcon from '@material-ui/icons/Link';
import PieChartIcon from '@material-ui/icons/PieChart';


// Custom
import TestEntryDialog from './tests/TestEntryDialog'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: theme.palette.text.primary,
        textDecoration: "none"
    },
    appBar: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
}));

function NiceDivider(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Divider component="li" />
            <li>
                <Typography
                    className={classes.dividerFullWidth}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                >
                    {props.text}
                </Typography>
            </li>
        </React.Fragment>
    )
}

function ExternalLink(props) {

    const classes = useStyles();
    const { link, text, close } = props

    return (
        <a
            href={link}
            className={classes.title}
            target="_blank"
            rel="noreferrer"
        >
            <MenuItem
                onClick={close}
            >
                <ListItemIcon>
                    <LinkIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>
                    {text}
                </ListItemText>
            </MenuItem>
        </a>
    )

}

function MenuButton(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)

    function close() {
        setAnchorEl(null)
    }

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={event => setAnchorEl(event.currentTarget)}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={close}
            >
                <Link to="/people" className={classes.title}>
                    <MenuItem
                        onClick={close}
                    >
                        <ListItemIcon>
                            <PeopleAltIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                            Manage People
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/reports" className={classes.title}>
                    <MenuItem
                        onClick={close}
                    >
                        <ListItemIcon>
                            <AssessmentIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                            Individual Reports
                        </ListItemText>
                    </MenuItem>
                </Link>
                <MenuItem
                    onClick={close}
                    disabled
                >
                    <ListItemIcon>
                        <PieChartIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText>
                        Group Reports
                    </ListItemText>
                </MenuItem>
                <NiceDivider text="USAF Links" />
                <ExternalLink
                    link="https://affms.us.af.mil/"
                    text="Official AFFMS II"
                    close={close}
                />
                <ExternalLink
                    link="https://www.afpc.af.mil/Portals/70/documents/07_FITNESS/5%20Year%20Score%20Chart%20updated%201.5%20mile%20pushups%20and%20situps%2020210602_0935.pdf?ver=_cagn5TJARTu2cXf5spDGA%3d%3d"
                    text="PT Standards"
                    close={close}
                />
                <ExternalLink
                    link="https://static.e-publishing.af.mil/production/1/af_a1/publication/afman36-2905/afman36-2905.pdf"
                    text="AFI 36-2905"
                    close={close}
                />
            </Menu>
        </React.Fragment>
    )

}

function TopNav() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false)

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <MenuButton />
                    <Link to="/" className={classes.title}>
                        <Typography variant="h6" >
                            Home
                        </Typography>
                    </Link>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton color="inherit" aria-label="Add New Test Entry" onClick={() => { setOpen(true) }}>
                        <PostAddIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TestEntryDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    );



}

export default TopNav
export {
    MenuButton
}