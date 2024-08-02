import React from "react";
import { BaseTVSeriesProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface SimilarTVSeriesProps {
  series: BaseTVSeriesProps[];
}

const SimilarTVSeries: React.FC<SimilarTVSeriesProps> = ({ series }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Similar TV Series
      </Typography>
      <Grid container spacing={2}>
        {series.map((s) => (
          <Grid item key={s.id} xs={12} sm={6} md={4} lg={3}>
            <Paper>
              <img
                src={`https://image.tmdb.org/t/p/w200${s.poster_path}`}
                alt={s.name}
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6" component="p">
                {s.name}
              </Typography>
              <Link to={`/tv-series/${s.id}`} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
                  More Info
                </Button>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SimilarTVSeries;
