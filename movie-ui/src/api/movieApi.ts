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