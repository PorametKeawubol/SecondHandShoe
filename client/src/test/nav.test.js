import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter to wrap the component
import HamburgerMenu from '../Component/nav'; // Adjust the import path as needed

describe('HamburgerMenu', () => {
  it('renders the HamburgerMenu component', () => {
    render(
      <Router>
        <HamburgerMenu handleLogout={() => {}} />
      </Router>
    );

    const hamburgerMenu = screen.getByRole('button', { name: /open menu/i });
    expect(hamburgerMenu).toBeInTheDocument();
  });

  it('expands dropdown menu on click', () => {
    render(
      <Router>
        <HamburgerMenu handleLogout={() => {}} />
      </Router>
    );

    const hamburgerMenu = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(hamburgerMenu);

    const dropdown = screen.getByRole('menu');
    expect(dropdown).toBeInTheDocument();
  });

  it('collapses dropdown menu on second click', () => {
    render(
      <Router>
        <HamburgerMenu handleLogout={() => {}} />
      </Router>
    );

    const hamburgerMenu = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(hamburgerMenu); // Expand dropdown
    fireEvent.click(hamburgerMenu); // Collapse dropdown

    const dropdown = screen.queryByRole('menu');
    expect(dropdown).not.toBeInTheDocument();
  });
});
