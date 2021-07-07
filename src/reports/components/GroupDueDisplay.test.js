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

const people = [
    {
        lastOfficial: {
            nextDue: addMonths(new Date(), 2),
            score: 90.2
        }
    },
    {
        lastOfficial: {
            nextDue: addMonths(new Date(), 1),
            score: 85
        }
    },
    {
        lastOfficial: {
            nextDue: new Date(),
            score: 79
        }
    },
    {
        lastOfficial: {
            nextDue: subMonths(new Date(), 1),
            score: 65
        }
    },
    {
        lastOfficial: undefined
    }
]

describe('<GroupDueDisplay> without tests', function() {
    beforeEach(() => {
        render(
            <GroupDueDisplay
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
                people={people}
            />
        )
    })
    it('should present a pie chart with data', function() {

    })
})

export {
    people
}