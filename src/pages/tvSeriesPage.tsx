import React from "react";
import TVSeriesListPageTemplate from "../components/templateTVSeriesListPage"; // Ensure the path is correct
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseTVSeriesProps, DiscoverTVSeries } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import TVSeriesFilterUI, { titleFilter, genreFilter } from "../components/tvSeriesFilterUI";
import useFiltering from "../hooks/useFiltering";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>("discoverTV", getTVSeries);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];
  const displayedSeries = filterFunction(tvSeries);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <TVSeriesFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <TVSeriesListPageTemplate
        title="Discover TV Series"
        series={displayedSeries}
        action={(series: BaseTVSeriesProps) => (
          <>
            <AddToFavouritesIcon {...series} />
            <Link to={`/tv-series/${series.id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
                More Info
              </Button>
            </Link>
          </>
        )}
      />
    </>
  );
};

export default TVSeriesPage;
