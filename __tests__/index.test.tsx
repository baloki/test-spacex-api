import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import fetchMock from 'jest-fetch-mock';

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
