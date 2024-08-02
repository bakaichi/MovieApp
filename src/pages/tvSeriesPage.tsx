import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api"; // You'll need to create this API function
import Spinner from "../components/spinner";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("tvSeries", getTVSeries);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title="Discover TV Series"
        movies={tvSeries}
        action={(series: BaseMovieProps) => {
          return <AddToFavouritesIcon {...series} />;
        }}
      />
    </>
  );
};

export default TVSeriesPage;