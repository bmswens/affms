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

// Custom
import db from '../db/db';
import { formatDate } from './PeoplePage';
import PersonDialog from './PersonDialog'

function PersonCard(props) {

    const { person, refresh } = props;

    const [deleted, setDeleted] = React.useState(false);
    async function handleDelete() {
        await db.PersonTable.delete(person);
        setDeleted(true);
        refresh();
    }

    const [openEdit, setOpenEdit] = React.useState(false)

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