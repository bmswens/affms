// React
import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// Icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// db
import db from '../db/db'

// dialog
import PersonDialog from './PersonDialog'
import PersonCard from './PersonCard';

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
                    <CardContent role="button" onClick={() => setOpen(true)} aria-label="Add New Person" >
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

function PeoplePage(props) {

    const [peopleCards, setPeopleCards] = React.useState(props.people || [])
    const [reload, setReload] = React.useState(0)

    async function load() {
        let people = await db.PersonTable.all()
        let cards = people.map(person =>  <PersonCard person={person} key={`${person.firstname}-${person.lastname}`} refresh={refresh} />)
        setPeopleCards(cards)
    }

    function refresh() {
        setReload(reload + 1)
    }

    React.useEffect(() => {
        load()
    }, [reload])

    return (
        <Grid container spacing={1} justify="center" alignItems="stretch" style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}>
            {peopleCards}
            <NewPersonCard
                callback={refresh}
            />
        </Grid>
    )

}


export default PeoplePage
export {
    NewPersonCard,
    formatDate
}