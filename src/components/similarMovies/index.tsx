import React from "react";
import { BaseMovieProps } from "../../types/interfaces";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface SimilarMoviesProps {
  movies: BaseMovieProps[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Similar Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Paper>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6" component="p">
                {movie.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SimilarMovies;
