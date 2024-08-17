import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import FantasyMovieList from "../fantasyMovieList";
import { FantasyMovieProps } from "../../types/interfaces";

interface TemplateFantasyMoviesListPageProps {
  title: string;
  movies: FantasyMovieProps[];
}

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  },
};

const TemplateFantasyMoviesListPage: React.FC<TemplateFantasyMoviesListPageProps> = ({ title, movies }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <FantasyMovieList movies={movies} />
      </Grid>
    </Grid>
  );
};

export default TemplateFantasyMoviesListPage;
