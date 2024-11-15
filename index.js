const express = require('express');
const cors = require('cors');
const { getAllMovies, getMovieById } = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

//1
app.get('/movies', async (req, res) => {
  const movies = await getAllMovies();
  res.json({ movies });
});

//2
app.get('/movies/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = await getMovieById(id);
  res.json(movie);
});

module.exports = { app };
