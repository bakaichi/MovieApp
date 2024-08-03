import React from "react";
import TVSeriesCard from "../tvSeriesCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BaseTVSeriesListProps } from "../../types/interfaces";

const TVSeriesListPageTemplate: React.FC<BaseTVSeriesListProps> = ({ series, action, title }) => {
    return (
      <>
        {title && (
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            style={{ marginTop: '20px' }}
          >
            {title}
          </Typography>
        )}
        <Grid container spacing={3} justifyContent="center">
          {series.map((s) => (
            <Grid item key={s.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <TVSeriesCard series={s} action={action} />
            </Grid>
          ))}
        </Grid>
      </>
    );
};

export default TVSeriesListPageTemplate;
