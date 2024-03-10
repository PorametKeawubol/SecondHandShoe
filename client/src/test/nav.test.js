import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HamburgerMenu from '../Component/nav'; // Adjust the import path as needed

describe('HamburgerMenu', () => {
  it('renders the HamburgerMenu component', () => {
    render(<HamburgerMenu handleLogout={() => {}} />);

    const hamburgerMenu = screen.getByRole('button', { name: /open menu/i });
    expect(hamburgerMenu).toBeInTheDocument();
  });
});
