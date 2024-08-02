import React from "react";
import { useParams } from "react-router-dom";
import TemplateTVSeriesPage from "../components/templateTVSeriesPage"; // Ensure the path is correct
import TVSeriesDetails from "../components/tvSeriesDetails";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import { TVSeriesDetailsProps } from "../types/interfaces";

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: series, error, isLoading, isError } = useQuery<TVSeriesDetailsProps, Error>(
    ["tvSeries", id],
    () => getTVSeriesDetails(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {series ? (
        <TemplateTVSeriesPage series={series}>
          <TVSeriesDetails {...series} />
        </TemplateTVSeriesPage>
      ) : (
        <p>Waiting for TV series details</p>
      )}
    </>
  );
};

export default TVSeriesDetailsPage;
