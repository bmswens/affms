// React
import React from 'react'
// testing lib
import {
    render,
    screen,
    waitFor,
    within,
    fireEvent
} from '@testing-library/react'
// help
import db from '../db/db'
import { waitForOrgSelector } from './OrgSelector.test'

// to test
import { GroupReport } from './GroupReportPage'
import GroupReportPage from './GroupReportPage'

async function waitForLoad() {
    let statusContainer = screen.getByTestId('group-reports-status')
    await waitFor(() => {
        let text = within(statusContainer).queryByText('loaded')
        expect(text).not.toBeNull()
    })
}

describe('<GroupReport> with no target', function () {
    beforeEach(() => {
        render(
            <div
                data-testid="parent-div"
            >
                <GroupReport
                    target={null}
                />
            </div>
        )
    })
    it('should return null', function () {
        let container = screen.getByTestId('parent-div')
        expect(container.children).toHaveLength(0)
    })
})

describe('<GroupReport> with target "All"', function() {
    beforeAll(async () => {
        await db.PersonTable.add({
            firstname: "John",
            lastname: "Doe",
            organization: "dev",
            gender: "male",
            birthdate: new Date()
        })
        await db.TestTable.add({
            firstname: 'John',
            lastname: "Doe",
            date: new Date(),
            gender: 'male',
            age: 25,
            push: 43,
            sit: 58,
            run: '09:54',
            official: true
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    beforeEach(async () => {
        render(
            <div
                data-testid="parent-div"
            >
                <GroupReport
                    target="All"
                />
            </div>
        )
        await waitForLoad()
    })
    it('should have children', function() {
        let parentDiv = screen.getByTestId('parent-div')
        expect(parentDiv.children.length).toBeTruthy()
    })
})

describe('<GroupReportPage>', function() {
    beforeAll(async () => {
        await db.PersonTable.add({
            firstname: "John",
            lastname: "Doe",
            organization: "dev",
            gender: "male",
            birthdate: new Date()
        })
        await db.TestTable.add({
            firstname: 'John',
            lastname: "Doe",
            date: new Date(),
            gender: 'male',
            age: 25,
            push: 43,
            sit: 58,
            run: '09:54',
            official: true
        })
    })
    afterAll(async () => {
        await db.PersonTable.clear()
        await db.TestTable.clear()
    })
    beforeEach(async () => {
        render(
            <GroupReportPage />
        )
        await waitForOrgSelector()
    })
    it('should allow the user to select an org', function() {
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: "dev"}})
        fireEvent.keyDown(input, {key: "ArrowDown"})
        fireEvent.keyDown(input, {key: 'Enter'})
        expect(input.value).toEqual('dev')
    })
})