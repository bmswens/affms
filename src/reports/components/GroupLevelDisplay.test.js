import React from 'react'

import {
    render,
    screen
} from '@testing-library/react'

import GroupLevelDisplay from './GroupLevelDisplay'

describe('<GroupLevelDisplay> without tests', function() {
    beforeEach(() => {
        render(
            <GroupLevelDisplay
                tests={[]}
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
                tests={[
                    {
                        score: 90.2
                    },
                    {
                        score: 85
                    },
                    {
                        score: 79
                    },
                    {
                        score: 65
                    }
                ]}
            />
        )
    })
    it('should render a pie graph', function() {
        
    })
})