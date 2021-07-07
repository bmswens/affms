import React from 'react'

import {
    render,
    screen
} from '@testing-library/react'

import { people } from './GroupDueDisplay.test'

import GroupLevelDisplay from './GroupLevelDisplay'

describe('<GroupLevelDisplay> without tests', function() {
    beforeEach(() => {
        render(
            <GroupLevelDisplay
            />
        )
    })
    it('should display the title', function() {
        let title = screen.getByText('Fitness Levels')
        expect(title).not.toBeNull()
    })
    it('should display "NO DATA"', function() {
        let text = screen.getByText('NO DATA')
        expect(text).not.toBeNull()
    })
})

describe('<GroupLevelDisplay> with tests', function() {
    beforeEach(() => {
        render(
            <GroupLevelDisplay
                people={people}
            />
        )
    })
    it('should render a pie graph', function() {
        
    })
})