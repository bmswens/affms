// React
import React from 'react'

// testing lib
import {  
    render,
    screen,
    fireEvent
} from '@testing-library/react'

// to test
import ConfirmationDialog from './ConfirmationDialog'

describe('<ConfirmationDialog>', function() {
    let close
    let callback
    beforeEach(() => {
        close = jest.fn()
        callback = jest.fn()
        render(
            <ConfirmationDialog
                open={true}
                setOpen={close}
                callback={callback}
                text={"Testing text"}
            />
        )
    })
    it('should contain a title and warning message', function() {
        let title = screen.getByRole('heading', {name: "Confirmation Required"})
        let text = screen.getByText(/Testing text/)
        expect(title).not.toBeNull()
        expect(text).not.toBeNull()
    })
    it('should have a functional cancel button', function() {
        let cancelButton = screen.getByRole('button', {name: 'Cancel'})
        fireEvent.click(cancelButton)
        expect(close).toHaveBeenCalled()
        expect(callback).not.toHaveBeenCalled()
    })
    it('should have a functional confirm button', function() {
        let confirmButton = screen.getByRole('button', {name: 'Confirm'})
        fireEvent.click(confirmButton)
        expect(callback).toHaveBeenCalled()
        expect(close).toHaveBeenCalled()
    })
})