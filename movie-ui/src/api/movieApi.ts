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