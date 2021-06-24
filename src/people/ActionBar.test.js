// react
import React from 'react';
// testing lib
import {
    screen,
    render,
    fireEvent,
    waitFor
} from '@testing-library/react';
// to test
import ActionBar from './ActionBar'

describe('<ActionBar />', function() {
    beforeEach(() => {
        render(<ActionBar />)
    })
    it('should have a "Delete All People" button', async function() {
        let downloadButton = screen.getByRole('button', {name: "Delete All People"})
        expect(downloadButton).not.toBeNull()
        fireEvent.click(downloadButton)
        await waitFor(() => {
            let text = screen.queryByText(/Not Implemented/)
            expect(text).not.toBeNull()
        })
    })
    it('should have a "Download From Cloud" button', async function() {
        let downloadButton = screen.getByRole('button', {name: "Download From Cloud"})
        expect(downloadButton).not.toBeNull()
        fireEvent.click(downloadButton)
        await waitFor(() => {
            let text = screen.queryByText(/Not Implemented/)
            expect(text).not.toBeNull()
        })
    })
    it('has a an "Download All People" button', async function() {
        let downloadButton = screen.getByRole('button', {name: "Download All People"})
        expect(downloadButton).not.toBeNull()
        fireEvent.click(downloadButton)
        await waitFor(() => {
            let text = screen.queryByText(/Not Implemented/)
            expect(text).not.toBeNull()
        })
    })
    it('has a an "Upload New Person" button', async function() {
        let uploadNewButton = screen.getByRole('button', {name: "Upload Person Or People"})
        expect(uploadNewButton).not.toBeNull()
        fireEvent.click(uploadNewButton)
        await waitFor(() => {
            let text = screen.queryByText(/Not Implemented/)
            expect(text).not.toBeNull()
        })
    })
    it('should have a "Upload To Cloud" button', async function() {
        let downloadButton = screen.getByRole('button', {name: "Upload To Cloud"})
        expect(downloadButton).not.toBeNull()
        fireEvent.click(downloadButton)
        await waitFor(() => {
            let text = screen.queryByText(/Not Implemented/)
            expect(text).not.toBeNull()
        })
    })
    it('has a functional "Add New Person" button', async function() {
        let dialog = screen.queryByRole('dialog')
        expect(dialog).toBeNull()
        let addNewButton = screen.getByRole('button', {name: 'Add New Person'})
        fireEvent.click(addNewButton)
        await waitFor(() => {
            dialog = screen.queryByRole('dialog')
            expect(dialog).not.toBeNull()
            let title = screen.queryByText(/Add a Member/)
            expect(title).not.toBeNull()
        })
    })
})