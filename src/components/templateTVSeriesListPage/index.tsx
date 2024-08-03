import React from "react";
import Grid from "@mui/material/Grid";
import TVSeriesCard from "../tvSeriesCard";
import TVSeriesHeader from "../tvSeriesHeader";
import { BaseTVSeriesListProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TVSeriesListPageTemplate: React.FC<BaseTVSeriesListProps> = ({ series, action, title,}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <TVSeriesHeader title={title || "Discover TV Series"} />
      </Grid>
      <Grid item container spacing={5} justifyContent="center">
        {series.map((s) => (
          <Grid item key={s.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <TVSeriesCard series={s} action={action} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TVSeriesListPageTemplate;
