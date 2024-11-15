const request = require('supertest');
const http = require('http');
const { getAllMovies } = require('../controllers');
const { app } = require('../index.js');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all the movies', () => {
    let mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];
    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    expect(result.length).toBe(3);
    expect(result).toEqual(mockMovies);
  });
});

describe('API endpoint tests', () => {
  test('GET /movies should get all the movies', async () => {
    const res = await request(server).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body.movies).toEqual([
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ]);
    expect(res.body.movies.length).toBe(3);
  });

  test('GET /movies/details/:id should get a movie by Id', async () => {
    const res = await request(server).get('/movies/details/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movieId: 2,
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      director: 'Frank Darabont',
    });
  });
});
