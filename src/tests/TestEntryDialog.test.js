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
    beforeEach(async () => {
        render(<TestEntryDialog open={true} setOpen={() => jest.fn()}/>)
        let input = screen.getByRole('textbox', {name: "Test Taker"})
        fireEvent.change(input, {target: {value: "John"}})
        expect(await screen.findByText(/John Doe/)).toBeInTheDocument()
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

// TODO: Test the <FeedbackDialog />
// it's mostly just display, so simply rendering as part of <TestEntryDialog /> covered most