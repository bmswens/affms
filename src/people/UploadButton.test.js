import React from 'react'

import {
    screen,
    render
} from '@testing-library/react'

import { subDays } from 'date-fns'

import db from '../db/db'

// to test
import { uploadPerson } from './UploadButton'

let testPerson = {
    firstname: "John",
    lastname: "Doe",
    birthdate: new Date(),
    gender: 'male',
    lastUpdated: subDays(new Date(), 1)
}

describe('The uploadPerson function', function () {
    beforeEach(async () => {
        db.PersonTable.add(testPerson)
    })
    afterEach(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    it('should upload a new person', async function() {
        await uploadPerson({
            ...testPerson,
            firstname: "Jane"
        })
        let response = await db.PersonTable.query({firstname: "Jane", lastname: "Doe"})
        expect(response).toHaveLength(1)
    })
    it('should update a person if lastUpdated is newer', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: new Date()
        })
        let response = await db.PersonTable.query({firstname: "John", lastname: "Doe"})
        let responsePerson = response[0]
        expect(responsePerson.organization).toEqual('dev')
    })
    it('should not update a person if lastUpdated is older', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: subDays(new Date(), 3)
        })
        let response = await db.PersonTable.query({firstname: "John", lastname: "Doe"})
        let responsePerson = response[0]
        expect(responsePerson.organization).toEqual(undefined)
    })
})