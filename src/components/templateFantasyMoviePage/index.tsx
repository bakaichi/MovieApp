import React from "react";
import Grid from "@mui/material/Grid";
import FantasyMovieHeader from "../headerFantasyMovie";
import { FantasyMovieProps } from "../../types/interfaces";

interface TemplateFantasyMoviePageProps {
  movie: FantasyMovieProps;
  children: React.ReactNode;
}

const TemplateFantasyMoviePage: React.FC<TemplateFantasyMoviePageProps> = ({ movie, children }) => {
  return (
    <>
      <FantasyMovieHeader movie={movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <img
            src={movie.image}
            alt={movie.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateFantasyMoviePage;
