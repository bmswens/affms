// React
import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'

// db
import db from '../db/db'

// dialog
import PersonCard from './PersonCard';
import ActionBar from './ActionBar'

function formatDate(date) {
    let output = date.toUTCString().split(' ')
    return `${output[1]} ${output[2]} ${output[3]}`
}


function PeoplePage(props) {

    const [peopleCards, setPeopleCards] = React.useState(props.people || [])
    const [reload, setReload] = React.useState(0)
    
    const refresh = React.useCallback(() => {
        setReload(reload + 1)
    }, [reload])

    const load = React.useCallback(async () => {
        let people = await db.PersonTable.all()
        let cards = people.map(person =>  <PersonCard person={person} key={`${person.firstname}-${person.lastname}`} refresh={(refresh)} />)
        setPeopleCards(cards)
    }, [refresh])


    React.useEffect(() => {
        load()
    }, [load])

    return (
        <Grid 
            container 
            spacing={1} 
            justify="center" 
            alignItems="stretch" 
            style={{ marginTop: 5, paddingLeft: 7, paddingRight: 7 }}
        >
            <ActionBar callback={refresh}/>
            {peopleCards}
        </Grid>
    )

}


export default PeoplePage
export {
    formatDate
}