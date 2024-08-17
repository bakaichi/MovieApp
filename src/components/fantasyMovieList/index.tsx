import React from "react";
import Grid from "@mui/material/Grid";
import FantasyMovieCard from "../fantasyMovieCard";
import { FantasyMovieProps } from "../../types/interfaces";

interface FantasyMovieListProps {
  movies: FantasyMovieProps[];
}

const FantasyMovieList: React.FC<FantasyMovieListProps> = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <Grid key={movie.title} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FantasyMovieCard movie={movie} />
        </Grid>
      ))}
    </>
  );
};

export default FantasyMovieList;
