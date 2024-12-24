import { Box, Grid } from "@radix-ui/themes"

import { Movie } from "../types/movie";

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList = ({ movies }: MoviesListProps) => (
  <Grid columns="3" gap="3" rows="repeat(2, 64px)" width="auto">
    {movies.map((movie) => (
      <Box key={movie.id} css={{ backgroundColor: 'white', padding: '1rem' }}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </Box>
    ))}
  </Grid>
);

export default MoviesList;
