import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import RegisterPc from '../AllPage/Register';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock axios

describe('RegisterPc Component', () => {
  test('renders RegisterPc component', () => {
    render(<Router><RegisterPc /></Router>);

    // Ensure that all input fields are rendered
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lastname')).toBeInTheDocument(); 
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();

    // Ensure that buttons are rendered
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
  });

  test('submitting the form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } }); // Mock successful API response

    render(<Router><RegisterPc /></Router>);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Lastname'), { target: { value: 'Doe' } });

    // Submit the form
    fireEvent.click(screen.getByText('SIGN UP'));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        username: 'John',
        password: 'testpassword',
        email: 'test@example.com',
        First_Name: 'John',
        Last_Name: 'Doe',
      });
    });

    // Ensure that the user is redirected after successful registration
    expect(window.location.pathname).toBe('/'); // Assuming '/' is the route to redirect after successful registration
  });

  
  });

  // Add more test cases as needed for other scenarios

