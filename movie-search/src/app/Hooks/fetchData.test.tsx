import fetchData from './fetchData';
import movie from '../Interfaces/movie';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchData', () => {
  it('returns movies data on successful fetch', async () => {
    const mockMovies: movie[] = [
      { id: '1', name: 'Movie 1', thumbnail: 'url1', description: 'desc1', genres: ['Action'], duration: '120 min' },
      { id: '2', name: 'Movie 2', thumbnail: 'url2', description: 'desc2', genres: ['Drama'], duration: '90 min' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies), { status: 200 });

    const result = await fetchData('test');

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('q=test')
    );
    expect(result).toEqual(mockMovies);
  });

  it('throws error with 404 status', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    await expect(fetchData('notfound')).rejects.toThrow('Response status: 404, Page no found');
  });

  it('throws error with 401 status', async () => {
    fetchMock.mockResponseOnce('', { status: 401 });

    await expect(fetchData('unauthorized')).rejects.toThrow('Response status: 401, Unauthorized');
  });

  it('throws error with 403 status', async () => {
    fetchMock.mockResponseOnce('', { status: 403 });

    await expect(fetchData('forbidden')).rejects.toThrow('Response status: 403, Forbidden');
  });

  it('throws error with 429 status', async () => {
    fetchMock.mockResponseOnce('', { status: 429 });

    await expect(fetchData('ratelimited')).rejects.toThrow('Response status: 429, Rate-limited');
  });
});