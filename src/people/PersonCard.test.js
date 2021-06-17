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
});
