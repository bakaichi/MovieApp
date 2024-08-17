import React from "react";
import TVSeriesHeader from "../tvSeriesHeader"; 
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVSeriesImages } from "../../api/tmdb-api"; // Use the correct API call
import { TVSeriesDetailsProps, MovieImage } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateTVSeriesPageProps {
  series: TVSeriesDetailsProps;
  children: React.ReactElement;
}

const TemplateTVSeriesPage: React.FC<TemplateTVSeriesPageProps> = ({ series, children }) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["tvImages", series.id],
    () => getTVSeriesImages(series.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as MovieImage[];

  return (
    <>
      <TVSeriesHeader title={""} {...series} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {images.map((image: MovieImage) => (
                <ImageListItem key={image.file_path} sx={styles.gridListTile} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={series.name}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTVSeriesPage;
