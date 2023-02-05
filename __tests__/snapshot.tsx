import { act, render } from '@testing-library/react';
import Home from '@/pages/index';
import { unmountComponentAtNode } from 'react-dom';
import { readFile } from 'fs/promises';
import fetchMock from 'jest-fetch-mock';

describe('snapshot test', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders homepage unchanged', async () => {
    const json = await readFile(new URL('./mocks/formattedspacexapimock.json', import.meta.url), 'utf8').then(
      (response) => JSON.parse(response)
    );

    const mockData = json;

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    await act(async () => {
      render(<Home />);
    });
    expect(document.body).toMatchSnapshot();
  });

  it('renders an error when the feed cannot be loaded', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(document.body).toMatchSnapshot();
  });
});
