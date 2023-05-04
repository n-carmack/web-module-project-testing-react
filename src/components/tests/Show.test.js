import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

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


test('renders without errors', () => {
    render(<Show show={exampleShowData} selectedSeason={"none"}/>);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={"none"}/>);


    const loadingStatus = screen.queryByTestId('loading-container');


    expect(loadingStatus).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShowData} selectedSeason={"none"}/>);


    const seasonOptions = screen.queryAllByTestId("season-option");


    expect(seasonOptions).toHaveLength(3);
});

test('handleSelect is called when a season is selected', () => {
    const handleSelect = jest.fn();

    render(<Show show={exampleShowData} selectedSeason={"none"} handleSelect={handleSelect}/>);

    const select = screen.getByLabelText(/Select A Season/i);

    fireEvent.change(select, ["1"]);

    expect(handleSelect).toBeCalled();

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
   const {rerender} = render(<Show show={exampleShowData} selectedSeason={"none"}/>);
   let episodes = screen.queryByTestId("episodes-container");

   expect(episodes).not.toBeInTheDocument();

   rerender(<Show show={exampleShowData} selectedSeason={1}/>);

   episodes = screen.queryByTestId("episodes-container");
   expect(episodes).toBeInTheDocument();
});
