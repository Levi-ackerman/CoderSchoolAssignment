

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const NOW_PLAYING_URL = 'movie/now_playing';
const TOP_RATED_URL = 'movie/top_rated';

const loadNowPlayingMovies = (page, type) => {
  let url = (type === 'now_playing') ? NOW_PLAYING_URL : TOP_RATED_URL;
  return fetch(`${BASE_URL}${url}?api_key=${API_KEY}&page=${page}`)
    .then((response) => response.json());
};

export {
  loadNowPlayingMovies,
}