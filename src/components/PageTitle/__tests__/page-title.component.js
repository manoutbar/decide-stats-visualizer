import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react';
import PageTitle from '../index';

describe('Navbar component tests', () => {

  it('renders with title "SAMPLE PAGE"', () => {
    render(<PageTitle>SAMPLE PAGE</PageTitle>);

    const heading = screen.getByRole('heading', { name: /SAMPLE PAGE/ });

    expect(heading).toBeInTheDocument();
  })  

});

