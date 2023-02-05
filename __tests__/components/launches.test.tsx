import { act, render, screen, waitFor } from '@testing-library/react';
import { readFile } from 'fs/promises';
import { Launches } from '@/components/launches';
import fetchMock from 'jest-fetch-mock';

describe('Launches', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the results', async () => {
    const json = await readFile(new URL('../mocks/formattedspacexapimock.json', import.meta.url), 'utf8').then(
      (response) => JSON.parse(response)
    );

    const mockData = json;

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    await act(async () => {
      render(<Launches />);
    });

    const heading = screen.getByRole('heading', {
      name: new RegExp(mockData.data[0].name, 'i'),
    });

    const secondHeading = screen.getByRole('heading', {
      name: new RegExp(mockData.data[1].name, 'i'),
    });

    expect(heading).toBeInTheDocument();
    expect(secondHeading).toBeInTheDocument();
  });
});
