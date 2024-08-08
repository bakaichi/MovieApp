import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter, releaseYearFilter, releaseYearSort } from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import Pagination from "../Pagination";

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

// release year filtering
const releaseYearFiltering = {
  name: "releaseYear",
  value: "",
  condition: releaseYearFilter,
};

//  sorting by release year
const releaseYearSorting = {
  name: "sortOrder",
  value: "asc",
  condition: () => true, // Dummy condition as it's only for sorting
  sort: releaseYearSort, // Attach the sorting function
};

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { filterValues, setFilterValues, filterFunction, sortFunction } = useFiltering(
    [titleFiltering, genreFiltering, releaseYearFiltering, releaseYearSorting]
  );

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", currentPage],
    () => getMovies(currentPage),
    { keepPreviousData: true, staleTime: 5000 }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const movies = data ? data.results : [];
  const filteredMovies = filterFunction(movies);
  const displayedMovies = sortFunction(filteredMovies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        releaseYearFilter={filterValues[2].value}
        sortOrder={filterValues[3].value}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HomePage;