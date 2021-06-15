// React
import React from 'react'

// Date things
import { 
    subMonths,
    addMonths
 } from 'date-fns'

// testing library
import {
    screen,
    render,
} from '@testing-library/react'

// help
import { formatDate } from '../../people/PeoplePage'

// to test
import DueDisplay from './DueDisplay'

describe('<DueDisplay />', function() {
    let dueDate = addMonths(new Date(), 4)
    it('should display the duedate', function() {
        let expected = formatDate(dueDate)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        expect(screen.queryByText(expected)).not.toBeNull()
    })
    it('should display the status "Current" if there\'s more than 2 months prior to duedate', function() {
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Current'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Due Soon" if it is the month before it is due', function() {
        dueDate = addMonths(new Date(), 1)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Due Soon'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Due Now" if it is the month that it is due', function() {
        dueDate = new Date()
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Due Now'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Due Now" if "nextDue" is undefined', function() {
        dueDate = undefined
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Due Now'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Overdue" if it is past the month that it is due', function() {
        dueDate = subMonths(new Date(), 1)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Overdue'})
        expect(text).not.toBeNull()
    })
})