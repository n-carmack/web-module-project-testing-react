import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const exampleShowData = {
    name: 'Dark',
    summary: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.',
    seasons: [
        {
            name: 'Season 1',
            id: 1,
            episodes: []
        },
        {
            name: 'Season 2',
            id: 2,
            episodes: []
        },
        {
            name: 'Season 3',
            id: 3,
            episodes: []
        }
    ]
}


test('renders without errors with no props', async () => {
    render(<Display />)

});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData);

    render(<Display />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const show = await screen.findByTestId("show-container");

    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData);

    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(3)
    })

});
