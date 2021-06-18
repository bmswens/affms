// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

// Material UI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

// Custom
import db from '../db/db';
import { formatDate } from './PeoplePage';
import PersonDialog from './PersonDialog'

function PersonCard(props) {

    const { person, refresh } = props;

    // delete 
    const [deleted, setDeleted] = React.useState(false);
    async function handleDelete() {
        await db.PersonTable.delete(person);
        setDeleted(true);
        refresh();
    }

    const [openEdit, setOpenEdit] = React.useState(false)

    // download
    const [downloadURL, setDownloadURL] = React.useState(null)
    async function handleDownload() {
        let tests = await db.TestTable.getByPerson(person)
        let outputData = {
            ...person,
            tests: tests
        }
        let output = new Blob([JSON.stringify(outputData, null, 2)], {type : 'application/json'})
        let outputURL = URL.createObjectURL(output)
        setDownloadURL(outputURL)
    }

    React.useEffect(() => {
        if (downloadURL !== null) {
            let hiddenDownload = document.getElementById(`download-${person.firstname}-${person.lastname}-hidden-button`)
            hiddenDownload.click()
            URL.revokeObjectURL(downloadURL)
            setDownloadURL(null)
        }
    }, [downloadURL])

    if (deleted) {
        return null;
    }

    return (
        <React.Fragment>
            <Grid item xs={12} md={6} lg={3}>
                <Card>
                    <CardContent align="center">
                        <AccountCircleIcon
                            style={{
                                fontSize: 75
                            }} />
                        <Typography>
                            {person.firstname} {person.lastname}
                        </Typography>
                        <Typography>
                            Gender: {person.gender.replace(person.gender[0], person.gender[0].toUpperCase())}
                        </Typography>
                        <Typography>
                            Birthdate: {formatDate(person.birthdate)}
                        </Typography>
                        <Typography>
                            Age: {person.getAge()}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton
                            onClick={handleDelete}
                            aria-label={`Delete ${person.firstname} ${person.lastname} `}
                        >
                            <DeleteForeverIcon fontSize="large" />
                        </IconButton>
                        <div style={{ flexGrow: 1 }} />
                        <a 
                            id={`download-${person.firstname}-${person.lastname}-hidden-button`}
                            href={downloadURL}
                            download={`${person.firstname}-${person.lastname}.affms.json`}
                            style={{
                                display: 'none'
                            }}
                        >
                            Hidden Download Anchor
                        </a>
                        <IconButton
                            onClick={handleDownload}
                            aria-label={`Download ${person.firstname} ${person.lastname} `}
                        >
                            <CloudDownloadIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={() => setOpenEdit(true)}
                            aria-label={`Edit ${person.firstname} ${person.lastname} `}
                        >
                            <EditIcon fontSize="large" />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <PersonDialog
                open={openEdit}
                entry={person}
                editMode
                setOpen={setOpenEdit}
                callback={refresh}
            />
        </React.Fragment>

    );
}

export default PersonCard