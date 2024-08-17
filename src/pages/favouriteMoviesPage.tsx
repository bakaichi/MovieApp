import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import { titleFilter, genreFilter } from "../components/movieFilterUI";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavourites";
import WriteReviewIcon from "../components/cardIcons/writeReview";

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

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites ? filterFunction(allFavourites) : [];

  return (
    <>
      <PageTemplate
        title="Favourites"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromFavouritesIcon item={movie} isMovie={true} />
            <WriteReviewIcon item={movie} isMovie={true} />
          </>
        )}
      />
        onFilterValuesChange={setFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
    </>
  );
};

export default FavouriteMoviesPage;
