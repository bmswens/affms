import React from 'react'

import {
    Tooltip,
    Button
} from '@material-ui/core'

import PublishIcon from '@material-ui/icons/Publish'

import Person from '../db/Person'
import db from '../db/db'


async function uploadPerson(person) {
    let newPerson = new Person(person)
    let response = await db.PersonTable.query({firstname: person.firstname, lastname: person.lastname})
    if (response.length === 0) {
        let newPerson = new Person(person)
        newPerson.save()
    }
    else if (person.lastUpdated > response[0].lastUpdated) {
        newPerson.save()
    }
}

function UploadButton(props) {

    const {
        fontSize
    } = props

    function handleClick() {

    }

    return (
        <Tooltip title="Upload Person/People">
            <Button
                aria-label="Upload Person Or People"
            >
                <PublishIcon fontSize={fontSize} />
            </Button>
        </Tooltip>
    )
}

export default UploadButton
export {
    uploadPerson
}