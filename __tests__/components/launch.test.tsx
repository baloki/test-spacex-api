import { render, screen } from '@testing-library/react';
import { readFile } from 'fs/promises';
import { Launch } from '@/components/launch';
import fetchMock from 'jest-fetch-mock';

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the appropriate fields', async () => {
    const json = await readFile(new URL('../mocks/spacexapimock.json', import.meta.url), 'utf8').then((response) =>
      JSON.parse(response)
    );

    const mockData = json.result[0];

    render(<Launch {...mockData} />);

    const heading = screen.getByRole('heading', {
      name: new RegExp(mockData.name, 'i'),
    });

    expect(heading).toBeInTheDocument();
  });
});
