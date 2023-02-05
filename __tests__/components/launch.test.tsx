import { render, screen } from '@testing-library/react';
import { readFile } from 'fs/promises';
import { Launch } from '@/components/launch';
import fetchMock from 'jest-fetch-mock';

describe('Launch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the appropriate fields', async () => {
    const json = await readFile(new URL('../mocks/formattedspacexapimock.json', import.meta.url), 'utf8').then(
      (response) => JSON.parse(response)
    );

    const mockData = json.data[0];

    render(<Launch {...mockData} />);

    const heading = screen.getByRole('heading', {
      name: new RegExp(mockData.name, 'i'),
    });

    const missionLogo = screen.getByAltText(/Mission logo/i);

    const date = new Date(mockData.date_utc).toLocaleDateString('en-GB');

    expect(heading).toBeInTheDocument();
    expect(missionLogo).toHaveAttribute('src', 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png');
    expect(await screen.findByText(new RegExp(mockData.primary_core_id, 'i'))).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(date, 'i'))).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(mockData.payloads[0], 'i'))).toBeInTheDocument();
  });
});
