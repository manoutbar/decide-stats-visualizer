import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '../index';

describe('Navbar component tests', () => {

  it('renders with title "HELLO"', () => {
    render(<Navbar title="HELLO" />);

    const div = screen.getByText('HELLO');

    expect(div).toBeInTheDocument();
  })  

});

