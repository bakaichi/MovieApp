import React, { useContext } from "react";
import PageTemplate from "../components/templateTVSeriesListPage";
import { SeriesContext } from "../contexts/tvSeriesContext";
import { useQueries } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import { Link } from "react-router-dom";


const FavouriteTVSeriesPage: React.FC = () => {
  const { favourites: seriesIds } = useContext(SeriesContext);
  const { filterFunction } = useFiltering(
    []
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
    </>
  );
};

export default FavouriteTVSeriesPage;
