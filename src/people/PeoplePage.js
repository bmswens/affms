// React
import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';

// Icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// db
import db from '../db/db'

// dialog
import PersonDialog from './PersonDialog'

function formatDate(date) {
    let output = date.toUTCString().split(' ')
    return `${output[1]} ${output[2]} ${output[3]}`
}

function NewPersonCard(props) {

    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <Grid item xs={12} md={6} lg={4} >
                <Card 
                    style={{
                        height: "100%",
                        cursor: "pointer"
                    }} 
                    align="center" 
                    justifyitems="center"
                >
                    <CardContent role="button" onClick={() => setOpen(true)} >
                        <AddCircleOutlineIcon
                            style={{fontSize: 125}}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <PersonDialog
                open={open}
                setOpen={setOpen}
                callback={props.callback}
            />
        </React.Fragment>
    )

}

function PersonCard(props) {

    const { person } = props

    return (
        <Grid item xs={12} md={6} lg={4} >
            <Card>
                <CardContent align="center">
                    <AccountCircleIcon
                        style={{
                            fontSize: 75
                        }}
                    />
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
            </Card>
        </Grid>

    )

}

function PeoplePage(props) {

    const [peopleCards, setPeopleCards] = React.useState(props.people || [])
    const [reload, setReload] = React.useState(0)

    async function load() {
        let people = await db.PersonTable.all()
        let cards = people.map(person =>  <PersonCard person={person} key={`${person.firstname}-${person.lastname}`} />)
        setPeopleCards(cards)
    }

    React.useEffect(() => {
        load()
    }, [reload])

    return (
        <Grid container spacing={1} justify="center" alignItems="stretch" style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}>
            {peopleCards}
            <NewPersonCard
                callback={() => {setReload(reload + 1)}}
            />
        </Grid>
    )

}


export default PeoplePage
export {
    PersonCard,
    NewPersonCard,
    formatDate
}