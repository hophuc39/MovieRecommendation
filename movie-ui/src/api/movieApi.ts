import axiosInstance from './axiosInstance';
import { Movie } from '../types/movie';

export const fetchAllMovies = async () => {
  const response = await axiosInstance.get<Movie[]>('/movies');
  return response.data;
};

export const getTrendingMoviesDay = async (limit: number = 20, offset: number = 0) => {
  const response = await axiosInstance.get('/movies/trending/day', {
    params: { limit, offset }
  });
  return response.data.items;
};

export const getTrendingMoviesWeek = async (limit: number = 20, offset: number = 0) => {
  const response = await axiosInstance.get('/movies/trending/week', {
    params: { limit, offset }
  });
  return response.data.items;
};

export const getLatestTrailers = async () => {
  const response = await axiosInstance.get('/movies/latest-trailers');
  return response.data;
};

export const getMovieDetail = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}/credits`);
  return response.data;
};

export const getSimilarMovies = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}/similar`);
  return response.data;
};

export const getPeopleDetail = async (id: string) => {
  const response = await axiosInstance.get(`/people/${id}`);
  return response.data;
};

interface GetMoviesParams {
  sort?: string;
  genres?: string;
  minUserScore?: number;
  minUserVotes?: number;
  page?: number;
  query?: string;
}

export const getMovies = async (params: GetMoviesParams) => {
  const response = await axiosInstance.get('/movies', { params });
  return response.data;
};

export const getGenres = async () => {
  const response = await axiosInstance.get('/movies/genres');
  return response.data;
};

interface GetPeopleParams {
  page?: number;
}

export const getPeople = async (params: GetPeopleParams) => {
  const response = await axiosInstance.get('/people', { params });
  return response.data;
};

export const createMovieReview = async (movieId: string, data: { content: string; rating: number }) => {
  const response = await axiosInstance.post(`/movies/${movieId}/reviews`, data);
  return response.data;
};

export const toggleMovieWatchlist = async (movieId: string) => {
  const response = await axiosInstance.post(`/movies/${movieId}/watchlist`);
  return response.data;
};

export const toggleMovieFavorite = async (movieId: string) => {
  const response = await axiosInstance.post(`/movies/${movieId}/favorite`);
  return response.data;
};

export const getWatchlist = async () => {
  const response = await axiosInstance.get('/movies/user/watchlist');
  return response.data;
};

export const getFavorites = async () => {
  const response = await axiosInstance.get('/movies/user/favorites');
  return response.data;
};

export const isMovieInWatchlist = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}/watchlist/status`);
  return response.data;
};

export const isMovieInFavorites = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}/favorite/status`);
  return response.data;
};

export const searchMovies = async (query: string) => {
  const response = await axiosInstance.get('/movies/search', {
    params: { query }
  });
  return response.data;
};

export const searchMoviesWithLLM = async (query: string) => {
  const response = await axiosInstance.get('/movies/llm-search', {
    params: { query }
  });
  return response.data;
};

export const getNavigate = async (query: string) => {
  const response = await axiosInstance.get('/movies/navigate', {
    params: { query }
  });
  return response.data;
};