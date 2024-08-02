import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVSeriesReviews from "../tvSeriesReviews";
import SimilarTVSeries from "../similarTVSeries";
import { getSimilarTVSeries, getTVSeriesActors } from "../../api/tmdb-api";
import { TVSeriesDetailsProps, Actor } from "../../types/interfaces";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
  actorImage: {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
    borderRadius: "50%", // making image round
  },
  actorName: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  actorRole: {
    fontStyle: "italic",
    color: "gray",
  },
};

const TVSeriesDetails: React.FC<TVSeriesDetailsProps> = (series) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [similarSeries, setSimilarSeries] = useState<TVSeriesDetailsProps[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchSimilarSeries = async () => {
      try {
        const similar = await getSimilarTVSeries(series.id); // Use getSimilarTVSeries
        setSimilarSeries(similar.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch similar series", error);
      }
    };

    const fetchActors = async () => {
      try {
        const seriesActors = await getTVSeriesActors(series.id);
        setActors(seriesActors.slice(0, 10)); // Limit to top 10 actors
      } catch (error) {
        console.error("Failed to fetch series actors", error);
      }
    };

    fetchSimilarSeries();
    fetchActors();
  }, [series.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {series.overview}
      </Typography>
      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {series.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`Seasons: ${series.number_of_seasons}`} />
        <Chip icon={<AccessTimeIcon />} label={`Episodes: ${series.number_of_episodes}`} />
        <Chip icon={<StarRate />} label={`${series.vote_average}`} />
        <Chip label={`First Aired: ${series.first_air_date}`} />
      </Paper>
      <Typography variant="h5" component="h3">
        Actors
      </Typography>
      <Paper component="ul" sx={styles.chipSet}>
        {actors.map((actor) => (
          <li key={actor.id} style={{ textAlign: "center" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={styles.actorImage}
            />
            <Typography variant="subtitle1" component="p" sx={styles.actorName}>
              {actor.name}
            </Typography>
            <Typography variant="subtitle2" component="p" sx={styles.actorRole}>
              {actor.character}
            </Typography>
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TVSeriesReviews {...series} />
      </Drawer>
      <SimilarTVSeries series={similarSeries} />
    </>
  );
};

export default TVSeriesDetails;
