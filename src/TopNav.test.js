// React
import React from 'react'

// testing library
import {
    screen,
    render,
    fireEvent,
    waitFor,
} from '@testing-library/react'

// For wrapping
import { BrowserRouter } from 'react-router-dom'

// to test
import TopNav from './TopNav'
import { MenuButton } from './TopNav'

function Wrapper(props) {

    return (
        <BrowserRouter>
            {props.children}
        </BrowserRouter>
    )
}


describe('<MenuButton>', function() {
    beforeEach(() => {
        render(<MenuButton />, {wrapper: Wrapper})
    })
    it('should render a button that displays the menu when clicked', function() {
        let button = screen.queryByRole('button')
        expect(button).not.toBeNull()
        fireEvent.click(button)
        let pages = [
            'Manage People',
            'Individual Reports',
            'Group Reports',
            'Official AFFMS II',
            'PT Standards',
            'AFI 36-2905'
        ]
        for (let page of pages) {
            let text = screen.queryByText(page)
            expect(text).not.toBeNull()
        }
    })
})

describe('<TopNav>', function() {
    beforeEach(async () => {
        render(<TopNav />, {wrapper: Wrapper})
    })
    it('should open the <TestEntry> dialog when add button is clicked', function() {
        let dialog = screen.queryByRole('dialog')
        expect(dialog).toBeNull()
        let button = screen.getByRole('button', {name: 'Add New Test Entry'})
        fireEvent.click(button)
        waitFor(() => {
            dialog = screen.queryByRole('dialog')
            expect(dialog).not.toBeNull()
        })
    })
})