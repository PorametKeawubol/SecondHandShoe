import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToRate from '../Component/ToRateContent';

test('renders rating modal', () => {
    const onClose = jest.fn();

    const logSpy = jest.spyOn(console, 'log'); 

    const { getByTestId, getByText } = render(<ToRate onClose={onClose} />);

    fireEvent.click(getByTestId('rating-stars').children[3]);

    fireEvent.click(getByText('Submit'));

    expect(logSpy).toHaveBeenCalledWith('Submitted rating:', 4);

    expect(onClose).toHaveBeenCalled();
});
