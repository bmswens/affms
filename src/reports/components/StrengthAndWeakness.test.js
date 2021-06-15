// React
import React from 'react'

// Date things
import { 
    subMonths
 } from 'date-fns'

// testing library
import {
    screen,
    render,
    within,
    cleanup
} from '@testing-library/react'

// test data
import { tests } from './FitnessHistoryGrid.test'

// to test
import StrengthAndWeakness from './StrengthAndWeakness'

describe('<StrengthAndWeakness />', function() {
    beforeEach(() => {
        render(
            <StrengthAndWeakness
                tests={tests}
            />
        )
    })
    it('should display a "Strength" card detailing the strongest component based on points as percentage of max', function() {
        let title = screen.getByText('Strongest Component')
        expect(title).not.toBeNull()
        let content = screen.getByLabelText('Strongest Component')
        let componentName = within(content).queryByText('Push Ups')
        expect(componentName).not.toBeNull()
    })
    it('should display a "Weakness" card detailing the weakest component based on points as percentage of max', function() {
        let title = screen.getByText('Weakest Component')
        expect(title).not.toBeNull()
        let content = screen.getByLabelText('Weakest Component')
        let componentName = within(content).queryByText('1.5 Mile Run')
        expect(componentName).not.toBeNull()
    })
    it('should join them when they\'re equally strong or weak', function() {
        cleanup()
        render(
            <StrengthAndWeakness
                tests={[
                    {
                        date: new Date(),
                        pushScore: 17,
                        sitScore: 17,
                        runScore: 49,
                        score: 83
                    },
                    {
                        date: subMonths(new Date(), 1),
                        pushScore: 17,
                        sitScore: 17,
                        runScore: 48,
                        score: 81
                    }
                ]}
            />
        )
        let content = screen.getByLabelText('Strongest Component')
        let componentName = within(content).queryByText('Sit Ups, Push Ups')
        expect(componentName).not.toBeNull()
    })
    it('should render "No Test Data" if no tests passed', function() {
        render(
            <StrengthAndWeakness />
        )
        let texts = screen.queryAllByText(/No Test Data/)
        expect(texts.length).toEqual(2)
    })
})