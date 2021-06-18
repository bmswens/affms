import React from 'react';
import {
    screen,
    render,
    fireEvent,
    waitFor
} from '@testing-library/react';
import PersonCard from './PersonCard';
import { member } from './PeoplePage.test';

describe('<PersonCard > with person', function () {
    let body;
    beforeEach(() => {
        let { container } = render(<PersonCard person={member} refresh={() => jest.fn()} />);
        body = container;
    });
    it('should display all their relevant info', function () {
        let data = [
            screen.queryByText(/John/),
            screen.queryByText(/Doe/),
            screen.queryByText(/Gender: Male/),
            screen.queryByText(/Birthdate: 01 Jun 2021/),
            screen.queryByText(/Age: 1/)
        ];
        for (let text of data) {
            expect(text).not.toBeNull();
        }
    });
    it('should have a functional delete button', async function () {
        let deleteButton = screen.getByRole('button', { name: `Delete ${member.firstname} ${member.lastname}` });
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(body.children.length).toEqual(0);
        });
    });
    it('should have a functional edit button', async function() {
        let editButton = screen.getByRole('button', {name: `Edit ${member.firstname} ${member.lastname}`})
        fireEvent.click(editButton)
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeNull()
            expect(screen.queryByRole('heading', {name: 'Edit a Member'})).not.toBeNull()
        })
    })
    it('should have a functional download button', async function() {
        const spy = jest.spyOn(URL, "revokeObjectURL")
        let downloadButton = screen.getByRole('button', {name: `Download ${member.firstname} ${member.lastname}`})
        fireEvent.click(downloadButton)
        await waitFor(() => {
            expect(spy).toHaveBeenCalled()
        })
    })
});
