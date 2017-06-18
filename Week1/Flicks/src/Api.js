

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const NOW_PLAYING_URL = 'movie/now_playing';

const loadNowPlayingMovies = (page) => {
  console.log('[Api.js] loadNowPlayingMovies', page);
  return fetch(`${BASE_URL}${NOW_PLAYING_URL}?api_key=${API_KEY}&page=${page}`)
    .then((response) => response.json());
};

export {
  loadNowPlayingMovies,
}