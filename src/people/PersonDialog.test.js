// React
import React from 'react'

// testing library
import {
    screen,
    render,
    prettyDOM,
    fireEvent,
    waitFor,
    act
} from '@testing-library/react'

// to test
import PersonDialog from './PersonDialog'
import {
    MandatorySection,
    OptionalSection
} from './PersonDialog'
import db from '../db/db'

const member = {
    firstname: 'John',
    lastname: "Doe",
    birthdate: Date.parse("2021-06-01"),
    gender: "male"
}

describe('<MandatorySection />', function() {
    beforeEach(() => {
        render(<MandatorySection />)
    })
    it('should contain text fields for first and last name', function() {
        let fieldNames = [
            "First Name",
            "Last Name"
        ]
        for (let label of fieldNames) {
            let input = screen.getByRole('textbox', {name: label})
            expect(input).not.toBeNull()
        }
    })
    it('should contain a date selector', function() {
        let input = screen.getByLabelText('Birthdate')
        expect(input).not.toBeNull()
    })
    it('should contain a select box for gender', function() {
        let input = screen.getByRole('button', {name: 'Gender ​'})
        expect(input).not.toBeNull()
    })
})

describe('<MandatorySection> with pre-filled entry', function() {
    beforeEach(() => {
        render(
        <MandatorySection 
            entry={member}
        />
        )
    })
    it('should contain text fields filled with passed value', function() {
        let fields = [
            {label: "First Name", value: "John"},
            {label: "Last Name", value: "Doe"}
        ]
        for (let field of fields) {
            let input = screen.getByRole('textbox', {name: field.label})
            expect(input.value).toEqual(field.value)
        }
    })
    it('should contain a date selector with pre-filled value', function() {
        let input = screen.getByTestId('birthdate-input')
        expect(input.value).toBe('06/01/2021')
    })
    it('should contain a select box for gender', function() {
        let label = screen.getByRole('button', {name: 'Gender Male'})
        expect(label).not.toBeNull()
    })
})

describe('<OptionalSection>', function() {
    beforeEach(() => {
        // Open the accordion to play with it
        render(<OptionalSection />)
        let openButton = screen.getByRole('button')
        fireEvent.click(openButton)
    })
    it('should let the user know that these are optional', function() {
        let title = screen.queryByText('Optional Fields')
        expect(title).not.toBeNull()
    })
    it('should contain text fields for rank and organizaton', function() {
        let fields = [
            "Rank",
            "Organization"
        ]
        for (let field of fields) {
            let input = screen.getByRole('textbox', {name: field})
            expect(input).not.toBeNull()
        }
    })
})

describe('<PersonDialog />', function() {
    let open
    beforeEach(() => {
        open = true
        render(<PersonDialog open={open} setOpen={() => open = false} callback={() => jest.fn()} />)
    })
    it('should have the title "Add a Member"', function() {
        let title = screen.queryByText('Add a Member')
        expect(title).not.toBeNull()
    })
    it('should have a useful close button', function() {
        let dialog = screen.getByRole('dialog')
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole('button', {name: "Close"})
        fireEvent.click(closeButton)
        waitFor(() => {
            dialog = screen.queryByRole('dialog')
            expect(dialog).toBeNull()
        })
    })
    it('should have a submit button which is disabled if required fields are blank', function() {
        let submitButton = screen.queryByRole('button', {name: 'Submit'})
        expect(submitButton).not.toBeNull()
        expect(submitButton.disabled).toBeTruthy()
        // Change first name
        let firstNameField = screen.getByRole('textbox', {name: 'First Name'})
        fireEvent.change(firstNameField, {target: {value: "John"}})
        expect(submitButton.disabled).toBeTruthy()
        // Change last name
        let lastNameField = screen.getByRole('textbox', {name: 'Last Name'})
        fireEvent.change(lastNameField, {target: {value: "Doe"}})
        expect(submitButton.disabled).toBeTruthy()
        // Change birthdate
        let birthdateField = screen.getByTestId('birthdate-input')
        let now = new Date()
        fireEvent.change(birthdateField, now)
        expect(submitButton.disabled).toBeTruthy()
        // Change Gender
        let genderField = screen.getByTestId('gender-input')
        fireEvent.change(genderField, {target: {value: "male"}})
        expect(submitButton.disabled).not.toBeTruthy()
    })
    it('should be uneffected by filling in optional fields', function() {
        let submitButton = screen.queryByRole('button', {name: 'Submit'})
        expect(submitButton).not.toBeNull()
        expect(submitButton.disabled).toBeTruthy()
        // Open optional portion
        let openButton = screen.getByRole('button', {name: "Optional Fields"})
        fireEvent.click(openButton)
        // Change rank
        let rankField = screen.getByRole('textbox', {name: 'Rank'})
        fireEvent.change(rankField, {target: {value: "TSgt"}})
        expect(submitButton.disabled).toBeTruthy()
        // Change org
        let organizationField = screen.getByRole('textbox', {name: 'Organization'})
        fireEvent.change(organizationField, {target: {value: "DOB"}})
        expect(submitButton.disabled).toBeTruthy()
    })
    it('should add a member to the database when submit is enabled and clicked', async function() {
        let submitButton = screen.getByRole('button', {name: 'Submit'})
        // Change first name
        let firstNameField = screen.getByRole('textbox', {name: 'First Name'})
        fireEvent.change(firstNameField, {target: {value: "John"}})
        // Change last name
        let lastNameField = screen.getByRole('textbox', {name: 'Last Name'})
        fireEvent.change(lastNameField, {target: {value: "Doe"}})
        // Change birthdate
        let birthdateField = screen.getByTestId('birthdate-input')
        let now = new Date()
        fireEvent.change(birthdateField, now)
        // Change Gender
        let genderField = screen.getByTestId('gender-input')
        fireEvent.change(genderField, {target: {value: "male"}})
        expect(submitButton.disabled).not.toBeTruthy()
        fireEvent.click(submitButton)
        await waitFor(async () => {
            let people = await db.PersonTable.all()
            expect(people.length).toEqual(1)
        })
    })
})

describe('<PersonDialog /> with a pre-filled minimal entry', function() {
    beforeEach(() => {
        render(<PersonDialog open={true} entry={member} editMode/>)
    })
    it('should have the title "Edit a Member"', function() {
        let title = screen.queryByText('Edit a Member')
        expect(title).not.toBeNull()
    })
})