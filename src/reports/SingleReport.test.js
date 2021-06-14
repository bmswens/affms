// React
import React from 'react'

// testing library
import {
    screen,
    render,
    fireEvent,
    waitFor,
    within,
    act
} from '@testing-library/react'

// setup our person
import { subYears } from 'date-fns'
import db from '../db/db'

// to test
import SingleReportPage from './SingleReport'
import { SingleReport } from './SingleReport'

describe('<SingleReport /> with 2+ entries', function() {
    beforeAll(async () => {
        // Add our target
        await db.PersonTable.add({
            firstname: "John",
            lastname: "Doe",
            birthdate: subYears(new Date(), 19),
            gender: 'male'
        })
        await db.TestTable.add({
            firstname: 'John',
            lastname: 'Doe',
            date: new Date(),
            age: 19,
            gender: 'male',
            run: '10:10',
            sit: 58,
            push: 42,
            official: true
        })
        await db.TestTable.add({
            firstname: 'John',
            lastname: 'Doe',
            date: subYears(new Date(), 1),
            age: 19,
            gender: 'male',
            run: '09:47',
            sit: 58,
            push: 41,
            official: false
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    beforeEach(() => {
        render(
            <SingleReport
                target={
                    {
                        firstname: "John",
                        lastname: "Doe",
                    }
                }
            />
        )
    })
    it('should tell this member that they are current', async function() {
        await waitFor(async () => {
            let status = screen.getByText(/Current/)
            expect(status).not.toBeNull()
        })
    })
})

describe('<SingleReport /> with 1 entry', function() {
    beforeAll(async () => {
        // Add our target
        await db.PersonTable.add({
            firstname: "Johnny",
            lastname: "Doe",
            birthdate: subYears(new Date(), 19),
            gender: 'male'
        })
        await db.TestTable.add({
            firstname: 'Johnny',
            lastname: 'Doe',
            date: subYears(new Date(), 2),
            age: 19,
            gender: 'male',
            run: '09:47',
            sit: 58,
            push: 41,
            official: false
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    beforeEach(() => {
        render(
            <SingleReport
                target={
                    {
                        firstname: "Johnny",
                        lastname: "Doe",
                    }
                }
            />
        )
    })
    it('should tell the member they are overdue', async function() {
        await waitFor(async () => {
            let status = screen.getByText(/Overdue/)
            expect(status).not.toBeNull()
        })
    })
})

describe('<SingleReport /> with 0 entries', function() {
    beforeEach(() => {
        render(
            <SingleReport
                target={
                    {
                        firstname: "Jane",
                        lastname: "Doe",
                    }
                }
            />
        )
    })
    it('should tell them they are due', async function() {
        await waitFor(async () => {
            let status = await screen.findByText("Due Now")
            expect(status).not.toBeNull()
        })
    })
})

describe('<SingleReport /> with no target', function() {
    it('should return null', function() {
        const { container } = render(<SingleReport target={null} />)
        expect(container.children.length).toEqual(0)
    })
})

describe('<SingleReportPage />', function() {
    beforeAll(async () => {
        await db.PersonTable.add({
            firstname: "Jonathan",
            lastname: "Doe",
            birthdate: subYears(new Date(), 19),
            gender: 'male'
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
    })
    beforeEach(async () => {
        render(<SingleReportPage />)
        await waitFor(async () => {
            let status = screen.getByText('loaded')
            expect(status).not.toBeNull()
        })
    })
    it('should allow a user to click on a person to see their reports', async function() {
        let targetSelector = screen.getByLabelText('Target')
        targetSelector.focus()
        fireEvent.mouseDown(targetSelector)
        let options = screen.getByRole('presentation')
        let johnny = within(options).getByText(/Jonathan/)
        fireEvent.click(johnny)
        await waitFor(async () => {
            let text = screen.queryByText(/Due Now/)
            expect(text).not.toBeNull()
        })
    })
})