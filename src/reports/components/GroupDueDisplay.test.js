// React
import React from 'react'

// testing
import {
    render,
    screen
} from '@testing-library/react'

// date things
import { subMonths, addMonths } from 'date-fns'

// to test
import GroupDueDisplay from './GroupDueDisplay'

describe('<GroupDueDisplay> without tests', function() {
    beforeEach(() => {
        render(
            <GroupDueDisplay
                tests={[]}
            />
        )
    })
    it('should display the title', function() {
        let title = screen.getByText('Currency Status')
        expect(title).not.toBeNull()
    })
    it('should display "NO DATA"', function() {
        let text = screen.getByText('NO DATA')
        expect(text).not.toBeNull()
    })
})

describe('<GroupDueDisplay> with tests', function() {
    beforeEach(() => {
        render(
            <GroupDueDisplay
                tests={[
                    {
                        nextDue: addMonths(new Date(), 2)
                    },
                    {
                        nextDue: addMonths(new Date(), 1)
                    },
                    {
                        nextDue: new Date()
                    },
                    {
                        nextDue: subMonths(new Date(), 1)
                    }
                ]}
            />
        )
    })
    it('should present a pie chart with data', function() {

    })
})
