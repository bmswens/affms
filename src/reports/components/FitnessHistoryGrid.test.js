// React
import React from 'react'

// testing library
import {
    screen,
    render
} from '@testing-library/react'

// Date things
import { 
    subMonths
 } from 'date-fns'
 
// to test
import FitnessHistoryGrid from './FitnessHistoryGrid'
import { getFitLevel } from './FitnessHistoryGrid'


const tests = [
    {
        id: 1,
        date: new Date(),
        pushScore: 17,
        sitScore: 17,
        runScore: 49,
        score: 83
    },
    {
        id: 2,
        date: subMonths(new Date(), 1),
        pushScore: 17,
        sitScore: 16,
        runScore: 48,
        score: 81
    },
    {
        id: 3,
        date: subMonths(new Date(), 2),
        pushScore: 17,
        sitScore: 16.5,
        runScore: 47,
        score: 80.5
    }
]


describe('<FitnessHistoryGrid />', function() {
    it('should be a card containing a Material UI data grid', function() {
        render(
            <FitnessHistoryGrid
                tests={tests}
            />
        )
        let title = screen.queryByText(/Fitness History Grid/)
        expect(title).not.toBeNull()
    })
})

describe('getFitLevel()', function() {
    it('should return "Excellent" when score >= 90', function() {
        expect(getFitLevel({row: {totalPoints: 90}})).toEqual('Excellent')
    })
    it('should return "Satisfactory" when 75 <= score < 90', function() {
        expect(getFitLevel({row: {totalPoints: 80}})).toEqual('Satisfactory')
    })
    it('should return "Unsatisfactory" when score < 75', function() {
        expect(getFitLevel({row: {totalPoints: 74}})).toEqual('Unsatisfactory')
    })
    it('should return "EXEMPT" when score === "EXEMPT', function() {
        expect(getFitLevel({row: {totalPoints: "EXEMPT"}})).toEqual('EXEMPT')
    })
})


export {
    tests
}