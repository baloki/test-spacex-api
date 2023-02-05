import { FetchMock } from 'jest-fetch-mock';
import { createMocks } from 'node-mocks-http';
import { readFile } from 'fs/promises';
import spaceXApiCall from '@/pages/api/spacexlaunches';

const fetchMock = fetch as FetchMock;

describe('SpaceX Launches API', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns a set of ten responses', async () => {
    const { req, res } = createMocks({});

    const json = await readFile(new URL('../mocks/spacexapimock.json', import.meta.url), 'utf8').then((response) =>
      JSON.parse(response)
    );

    const mockData = json.result;
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    await spaceXApiCall(req, res);

    const result = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);
    expect(result.data.length).toEqual(10);
  });

  it('returns an error message when in error', async () => {
    const { req, res } = createMocks({});

    fetchMock.mockReject(() => Promise.reject('API is down'));

    await spaceXApiCall(req, res);

    const result = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(500);
    expect(result.error).toEqual('failed to fetch data');
  });
});
