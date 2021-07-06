import React from 'react'

import {
    fireEvent,
    render,
    screen,
    waitFor,
    within
} from '@testing-library/react'

import OrgSelector from './OrgSelector'

describe('<OrgSelector>', function() {
    let value
    let setValue
    beforeEach(async () => {
        value = ''
        setValue = jest.fn(input => value = input)
        render(
            <OrgSelector
                target={value}
                setTarget={setValue}
            />
        )
        await waitFor(() => {
            let statusDiv = screen.getByTestId('org-selector-status')
            let text = within(statusDiv).queryByText('loaded')
            expect(text).not.toBeNull()
        })
    })
    it('should allow the user to select a target org', function() {
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: "dev"}})
        fireEvent.keyDown(input, {key: "ArrowDown"})
        fireEvent.keyDown(input, {key: 'Enter'})
        expect(input.value).toEqual('dev')
    })
})