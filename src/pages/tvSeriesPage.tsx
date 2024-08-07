import React from "react";
import TVSeriesListPageTemplate from "../components/templateTVSeriesListPage";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseTVSeriesProps, DiscoverTVSeries } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import TVSeriesFilterUI, { titleFilter, genreFilter, releaseYearFilter, releaseYearSort } from "../components/tvSeriesFilterUI";
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

const releaseYearFiltering = {
  name: "releaseYear",
  value: "",
  condition: releaseYearFilter,
};

const releaseYearSorting = {
  name: "sortOrder",
  value: "asc",
  condition: () => true,
  sort: releaseYearSort,
};

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>("discoverTV", getTVSeries);
  const { filterValues, setFilterValues, filterFunction, sortFunction } = useFiltering(
    [titleFiltering, genreFiltering, releaseYearFiltering, releaseYearSorting]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];
  const filteredSeries = filterFunction(tvSeries);
  const displayedSeries = sortFunction(filteredSeries);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <TVSeriesFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        releaseYearFilter={filterValues[2].value} // New
        sortOrder={filterValues[3].value}         // New
      />
      <TVSeriesListPageTemplate
        title="Discover TV Series"
        series={displayedSeries}
        action={(series: BaseTVSeriesProps) => (
          <>
            <AddToFavouritesIcon {...series} />
            <Link to={`/tv-series/${series.id}`}>
              <Button variant="outlined" size="medium" color="primary">
                More Info ...
              </Button>
            </Link>
          </>
        )}
      />
    </>
  );
};

export default TVSeriesPage;