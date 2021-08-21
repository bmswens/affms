import React from 'react'

import {
    Tooltip,
    Button
} from '@material-ui/core'

import PublishIcon from '@material-ui/icons/Publish'

import Person from '../db/Person'
import db from '../db/db'


async function uploadPerson(person) {
    let tests = person.tests || []
    delete person.tests
    if (person.lastUpdated) {
        person.lastUpdated = new Date(Date.parse(person.lastUpdated))
    }
    let newPerson = new Person(person)
    let response = await db.PersonTable.query({firstname: person.firstname, lastname: person.lastname})
    if (response.length === 0) {
        await newPerson.save()
        for (let test of tests) {
            await db.TestTable.add(test)
        }
    }
    else if (person.lastUpdated > response[0].lastUpdated) {
        await newPerson.save()
        await db.TestTable.deleteByPerson(newPerson)
        for (let test of tests) {
            await db.TestTable.add(test)
        }
    }
}

function UploadButton(props) {

    let input = React.createRef()
    let callback = props.callback || uploadPerson

    const {
        fontSize
    } = props

    function handleClick() {
        let hiddenInput = document.getElementById('upload-input')
        hiddenInput.click()
    }

    async function handleLoad() {
        let file = input.current.files[0]
        let raw = await file.text()
        let content = JSON.parse(raw)
        if (content.people) {
            for (let person of content.people) {
                callback(person)
            }
        }
        else {
            callback(content)
        }
        
    }

    return (
        <React.Fragment>
            <input
                id="upload-input"
                data-testid="upload-input"
                type="file"
                onChange={handleLoad}
                ref={input}
                style={{
                    display: 'none'
                }}
            />
            <Tooltip title="Upload Person/People">
                <Button
                    aria-label="Upload Person Or People"
                    onClick={handleClick}
                    {...props}
                >
                    <PublishIcon fontSize={fontSize} />
                </Button>
            </Tooltip>
        </React.Fragment>
    )
}

export default UploadButton
export {
    uploadPerson
}