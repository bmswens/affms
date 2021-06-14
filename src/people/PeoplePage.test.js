// React
import React from 'react'

// testing library
import {
    screen,
    render,
    prettyDOM,
    fireEvent,
    waitFor
} from '@testing-library/react'

// to test
import PeoplePage from './PeoplePage'
import {
    PersonCard,
    NewPersonCard
} from './PeoplePage'
import db from '../db/db'

const member = {
    firstname: 'John',
    lastname: "Doe",
    birthdate: new Date(Date.parse("2021-06-01")),
    gender: "male",
    getAge: function () { return 1 }
}

describe('<PeoplePage>', function () {
    beforeAll(async () => {
        await db.PersonTable.add({
            firstname: 'John',
            lastname: "Doe",
            birthdate: new Date(Date.parse("2021-06-01")),
            gender: "male"
        })
        await waitFor(async () => {
            let people = await db.PersonTable.all()
            expect(people.length).toEqual(1)
        })
    })
    beforeEach(async () => {
        render(<PeoplePage />)
        await waitFor(async () => {
            expect(await screen.findByText(/John Doe/)).toBeInTheDocument()
        })
    })
    it('render without fail', async function () {
        let addPersonCard = screen.queryByRole('button')
        expect(addPersonCard).not.toBeNull()
    })
})

describe('<PersonCard > with person', function () {
    beforeEach(() => {
        render(<PersonCard person={member} />)
    })
    it('should display all their relevant info', function () {
        let data = [
            screen.queryByText(/John/),
            screen.queryByText(/Doe/),
            screen.queryByText(/Gender: Male/),
            screen.queryByText(/Birthdate: 01 Jun 2021/),
            screen.queryByText(/Age: 1/)
        ]
        for (let text of data) {
            expect(text).not.toBeNull()
        }
    })
})

describe('<NewPersonCard />', function () {
    beforeEach(() => {
        render(<NewPersonCard />)
    })
    it('should open the <PersonDialog> when clicked', async function () {
        let dialog = screen.queryByRole('dialog')
        expect(dialog).toBeNull()
        let card = screen.getByRole('button')
        fireEvent.click(card)
        await waitFor(() => {
            dialog = screen.queryByRole('dialog')
            expect(dialog).not.toBeNull()
        })
    })
})
