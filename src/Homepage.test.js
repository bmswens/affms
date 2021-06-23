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
            /AFFMS/,
            /About/,
            /The Technology/,
        ]
        for (let title of sections) {
            console.log(title)
            let text = screen.queryAllByText(title)
            expect(text.length).not.toEqual(0)
        }
    })
})