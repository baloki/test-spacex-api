import { act, render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import fetchMock from 'jest-fetch-mock';

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders a heading', async () => {
    await act(async () => {
      render(<Home />);
    });

    const heading = screen.getByRole('heading', {
      name: /SpaceX Launches/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
