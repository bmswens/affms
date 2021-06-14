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
import Homepage from './Homepage'

describe('<Homepage>', function() {
    beforeEach(() => {
        render(<Homepage />)
    })
    it('should have sections with arbitrary text', function() {
        let sections = [
            /About/,
            /The Technology/,
            /Useful Links/,
            /Contact Us/
        ]
        for (let title of sections) {
            let text = screen.queryByText(title)
            expect(text).not.toBeNull()
        }
    })
})