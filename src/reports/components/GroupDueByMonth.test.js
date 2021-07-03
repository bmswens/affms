import React from 'react'

import {
    render,
    screen
} from '@testing-library/react'

import {
    addMonths,
    subMonths
} from 'date-fns'

import GroupDueByMonth from './GroupDueByMonth'


describe('<GroupDueByMonth>', function() {
    beforeEach(() => {
        render(
            <GroupDueByMonth
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
    it('should display the title', function() {
        let title = screen.getByText('Due Dates By Month')
        expect(title).not.toBeNull()
    })
    it('should be a bar graph', function() {

    })
})