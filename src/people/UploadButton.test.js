import React from 'react'

import {
    screen,
    render,
    fireEvent,
    waitFor
} from '@testing-library/react'

import { subDays } from 'date-fns'

import db from '../db/db'

// to test
import { uploadPerson } from './UploadButton'
import UploadButton from './UploadButton'
import userEvent from '@testing-library/user-event'

let testPerson = {
    firstname: "John",
    lastname: "Doe",
    birthdate: new Date(),
    gender: 'male',
    lastUpdated: subDays(new Date(), 1)
}

let testInput = {
    run: "09:10",
    push: 52,
    sit: 58,
    gender: "male",
    age: 24,
    firstname: "John",
    lastname: "Doe",
    date: new Date(),
    official: true
}

describe('The uploadPerson function', function () {
    beforeEach(async () => {
        db.PersonTable.add(testPerson)
        await db.TestTable.add(testInput)
        await db.TestTable.add({
            ...testInput,
            date: new Date(Date.parse("2021-06-01"))
        })
    })
    afterEach(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    it('should upload a new person', async function () {
        await uploadPerson({
            ...testPerson,
            firstname: "Jane"
        })
        let response = await db.PersonTable.query({ firstname: "Jane", lastname: "Doe" })
        expect(response).toHaveLength(1)
    })
    it('should update a person if lastUpdated is newer', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: new Date()
        })
        let response = await db.PersonTable.query({ firstname: "John", lastname: "Doe" })
        let responsePerson = response[0]
        expect(responsePerson.organization).toEqual('dev')
    })
    it('should not update a person if lastUpdated is older', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: subDays(new Date(), 3)
        })
        let response = await db.PersonTable.query({ firstname: "John", lastname: "Doe" })
        let responsePerson = response[0]
        expect(responsePerson.organization).toEqual(undefined)
    })
    it('should update the tests if the person is updated', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: new Date(),
            tests: [
                testInput
            ]
        })
        let tests = await db.TestTable.getByPerson({
            firstname: testPerson.firstname,
            lastname: testPerson.lastname
        })
        expect(tests).toHaveLength(1)
    })
    it('should not update the tests if the person is not updated', async function () {
        await uploadPerson({
            ...testPerson,
            organization: "dev",
            lastUpdated: subDays(new Date(), 3),
            tests: [
                testInput
            ]
        })
        let tests = await db.TestTable.getByPerson({
            firstname: testPerson.firstname,
            lastname: testPerson.lastname
        })
        expect(tests).toHaveLength(2)
    })
})

describe('<UploadButton>', function () {
    let mockCallback
    beforeEach(async () => {
        await db.PersonTable.add(testPerson)
        mockCallback = jest.fn()
        render(
            <UploadButton callback={mockCallback} />
        )
    })
    afterEach(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    it('should have a psuedo button that the user clicks', function () {
        let uploadButton = screen.getByRole('button', { name: "Upload Person Or People" })
        fireEvent.click(uploadButton)
    })
    it('should upload a new person', async function () {
        let data = JSON.stringify({
            ...testPerson,
            firstname: "Bob"
        })
        let file = makeFile([data], 'upload.affms.json', { type: "application/json" })
        let uploadInput = screen.getByTestId("upload-input")
        userEvent.upload(uploadInput, file)
        await waitFor(async () => {
            expect(mockCallback.mock.calls).toHaveLength(1)
        })
    })
    it('should be able to upload a list of people', async function () {
        let data = JSON.stringify({
            people: [
                {
                    ...testPerson,
                    firstname: "Bob"
                },
                {
                    ...testPerson,
                    firstname: 'Joe'
                }
            ]
        })
        let file = makeFile([data], 'upload.affms.json', { type: "application/json" })
        let uploadInput = screen.getByTestId("upload-input")
        userEvent.upload(uploadInput, file)
        await waitFor(async () => {
            expect(mockCallback.mock.calls).toHaveLength(2)
        })
    })
    it('should display a warning about overwriting', function () {

    })
    it('should display a message no that changes were made', function () {

    })
})