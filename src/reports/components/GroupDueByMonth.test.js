import React from 'react'

import {
    render,
    screen
} from '@testing-library/react'
import { people } from './GroupDueDisplay.test'

import GroupDueByMonth from './GroupDueByMonth'


describe('<GroupDueByMonth>', function() {
    beforeEach(() => {
        render(
            <GroupDueByMonth
                people={people}
            />
        )
    })
    it('should display the title', function() {
        let title = screen.getByText('Due Dates By Month')
        expect(title).not.toBeNull()
    })
})