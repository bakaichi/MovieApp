import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BaseTVSeriesProps } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png"; // Placeholder image

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
};

interface TVSeriesCardProps {
  series: BaseTVSeriesProps;
  action: (s: BaseTVSeriesProps) => React.ReactNode;
}

const TVSeriesCard: React.FC<TVSeriesCardProps> = ({ series, action }) => {
  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.media}
        image={series.poster_path ? `https://image.tmdb.org/t/p/w500/${series.poster_path}` : img}
      />
      <CardContent>
        <Typography variant="h5" component="p">
          {series.name}
        </Typography>
        <Typography variant="h6" component="p">
          First Aired: {series.first_air_date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {action(series)} {/* Ensure only this action adds a button */}
      </CardActions>
    </Card>
  );
};

export default TVSeriesCard;
