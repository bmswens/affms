// React
import React from 'react'

// testing library
import {
    screen,
    render
} from '@testing-library/react'

// to test
import LevelDisplay from './LevelDisplay'

describe('<LevelDisplay />', function() {
    let points = 0
    it('should display "Unsatisfactory" if points < 75', function() {
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Unsatisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Satisfactory" if points 75 <= points < 90', function() {
        points = 80
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Satisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Satisfactory" if points 75 <= points < 90 (different color)', function() {
        points = 85
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Satisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Excellent" if 90 <= points', function() {
        points = 90
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Excellent"})
        expect(text).not.toBeNull()
    })
})