import React, { useContext } from "react";
import PageTemplate from "../components/templateTVSeriesListPage";
import { SeriesContext } from "../contexts/tvSeriesContext";
import { useQueries } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVSeriesFilterUI, { titleFilter, genreFilter } from "../components/tvSeriesFilterUI";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import { Link } from "react-router-dom";

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

const FavouriteTVSeriesPage: React.FC = () => {
  const { favourites: seriesIds } = useContext(SeriesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouriteSeriesQueries = useQueries(
    seriesIds.map((seriesId) => {
      return {
        queryKey: ["tvSeries", seriesId],
        queryFn: () => getTVSeriesDetails(seriesId.toString()),
      };
    })
  );

  const isLoading = favouriteSeriesQueries.find((s) => s.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteSeriesQueries.map((q) => q.data);
  const displayedSeries = allFavourites ? filterFunction(allFavourites) : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Series"
        series={displayedSeries}
        action={(series) => (
          <>
            <RemoveFromFavouritesIcon item={series} isMovie={false} />
            <WriteReviewIcon item={series} isMovie={false} />
            <Link to={`/tv-series/${series.id}`}>
            </Link>
          </>
        )}
      />
      <TVSeriesFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteTVSeriesPage;
