// React
import React from 'react'

// Date things
import { subYears } from 'date-fns'

// testing library
import {
    screen,
    render,
    fireEvent,
    waitFor,
    within,
    prettyDOM
} from '@testing-library/react'

// to test
import TestEntryDialog from './TestEntryDialog'

// to augment
import db from '../db/db'

const person = {
    firstname: "John",
    lastname: "Doe",
    gender: "male",
    birthdate: subYears(new Date(), 18)
}

describe('<TestEntryDialog>', function () {
    beforeAll(async () => {
        await db.PersonTable.add(person)
        await waitFor(async () => {
            let list = await db.PersonTable.all()
            expect(list.length).toEqual(1)
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
    })
    beforeEach(async () => {
        render(<TestEntryDialog open={true} setOpen={() => jest.fn()}/>)
        await waitFor(async () => {
            let statusContainer = screen.getByTestId('test-entry-status')
            let status = within(statusContainer).queryByText('loaded')
            expect(status).not.toBeNull()
        })
    })
    it('should have textboxes for the freeform fields', async function () {
        let fields = [
            "Push-ups",
            "Sit-ups",
            "Run Time",
            "Date",
            "Test Taker"
        ]
        for (let field of fields) {
            let input = screen.getByRole('textbox', { name: field })
            expect(input).not.toBeNull()
        }
        expect(screen.queryByLabelText("Official Test")).not.toBeNull()
    })
    it('should have a disabled button to start', function() {
        let submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton.disabled).toBeTruthy()
    })
    it('should enable and be able to submit with valid entry', async function() {
        let submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton.disabled).toBeTruthy()
        let submissions = [
            {
                field: "Push-ups",
                value: 52
            },
            {
                field: "Sit-ups",
                value: 58
            },
            {
                field: "Run Time",
                value: "09:10"
            }
        ]
        for (let submission of submissions) {
            expect(submitButton.disabled).toBeTruthy()
            let input = screen.getByRole('textbox', {name: submission.field})
            fireEvent.change(input, {target: {value: submission.value}})
        }
        let autoComplete = screen.getByRole('textbox', {name: "Test Taker"})
        autoComplete.focus()
        fireEvent.change(autoComplete, {target: {value: "John"}})
        fireEvent.keyDown(autoComplete, {key: "ArrowDown"})
        fireEvent.keyDown(autoComplete, {key: 'Enter'})
        expect(submitButton.disabled).not.toBeTruthy()
        fireEvent.click(submitButton)
        await waitFor(async () => {
            let tests = await db.TestTable.all()
            expect(tests.length).toEqual(1)
        })
    })
})

describe('<TestEntryDialog /> Ad Hoc', function() {
    function selectAdHoc() {
        let autoComplete = screen.getByRole('textbox', {name: "Test Taker"})
        autoComplete.focus()
        fireEvent.change(autoComplete, {target: {value: "Ad"}})
        fireEvent.keyDown(autoComplete, {key: "ArrowDown"})
        fireEvent.keyDown(autoComplete, {key: 'Enter'})
    }
    beforeEach(async () => {
        render(<TestEntryDialog open={true} setOpen={() => jest.fn()}/>)
        await waitFor(async () => {
            let statusContainer = screen.getByTestId('test-entry-status')
            let status = within(statusContainer).queryByText('loaded')
            expect(status).not.toBeNull()
        })
        selectAdHoc()
    })
    it('should open up the name and gender field when "Ad Hoc" is selected', async function() {
        await waitFor(() => {
            let ageField = screen.getByRole('textbox', {name: 'Age'})
            expect(ageField).not.toBeNull()
            let genderField = screen.queryByLabelText('Gender')
            expect(genderField).not.toBeNull()
        })
    })
    it('should require the two new fields before being able to submit', function() {
        let submissions = [
            {
                field: "Push-ups",
                value: 52
            },
            {
                field: "Sit-ups",
                value: 58
            },
            {
                field: "Run Time",
                value: "09:10"
            }
        ]
        let submitButton = screen.getByRole('button', {name: 'Submit'})
        for (let submission of submissions) {
            expect(submitButton.disabled).toBeTruthy()
            let input = screen.getByRole('textbox', {name: submission.field})
            fireEvent.change(input, {target: {value: submission.value}})
        }
        expect(submitButton.disabled).toBeTruthy()
        let ageField = screen.getByRole('textbox', {name: 'Age'})
        fireEvent.change(ageField, {target: { value: 18}})
        expect(submitButton.disabled).toBeTruthy()
        let genderField = screen.queryByLabelText('Gender')
        fireEvent.change(genderField.querySelector('input'), {target: { value: 'male'}})
        expect(submitButton.disabled).not.toBeTruthy()
    })
    it('should be able to submit ad hoc', async function() {
        let submissions = [
            {
                field: "Push-ups",
                value: 52
            },
            {
                field: "Sit-ups",
                value: 58
            },
            {
                field: "Run Time",
                value: "09:10"
            }
        ]
        let submitButton = screen.getByRole('button', {name: 'Submit'})
        for (let submission of submissions) {
            expect(submitButton.disabled).toBeTruthy()
            let input = screen.getByRole('textbox', {name: submission.field})
            fireEvent.change(input, {target: {value: submission.value}})
        }
        expect(submitButton.disabled).toBeTruthy()
        let ageField = screen.getByRole('textbox', {name: 'Age'})
        fireEvent.change(ageField, {target: { value: 18}})
        expect(submitButton.disabled).toBeTruthy()
        let genderField = screen.queryByLabelText('Gender')
        fireEvent.change(genderField.querySelector('input'), {target: { value: 'male'}})
        expect(submitButton.disabled).not.toBeTruthy()
        fireEvent.click(submitButton)
        await waitFor(async () => {
            expect(screen.queryByText(/Results/)).not.toBeNull()
        })
    })
})

// TODO: Test the <FeedbackDialog />
// it's mostly just display, so simply rendering as part of <TestEntryDialog /> covered most