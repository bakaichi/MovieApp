import React, { useState, useRef, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter, releaseYearFilter, releaseYearSort } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from "../Pagination";
import SearchMoviesForm from "../components/searchMovieCard";
import Fab from "@mui/material/Fab";
import { Button } from "@mui/material";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const { filterValues, setFilterValues, filterFunction, sortFunction } = useFiltering(
    [titleFiltering, genreFiltering, releaseYearFiltering, releaseYearSorting]
  );

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", currentPage],
    () => getMovies(currentPage),
    { keepPreviousData: true, staleTime: 5000 }
  );

  // function to ensure search form exits when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

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

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={filterFunction(sortFunction(data?.results || []))}
        action={() => null}
      />
      
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        releaseYearFilter={filterValues[2].value}
        sortOrder={filterValues[3].value}
      />
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setSearchOpen(true)}
        sx={{ 
          position: "fixed",   // button 
          top: "85px", 
          right: "90px", 
        }}
      >
        Search Movies
      </Fab>
      {searchOpen && (
        <div
          ref={searchPanelRef}
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "200px", 
            height: "100vh", 
            backgroundColor: "white", 
            padding: "10vh", 
            boxShadow: "0 0 15px rgba(0,0,0,0.3)", 
          }}
        >
          <SearchMoviesForm />
          <Button onClick={() => setSearchOpen(false)}>Close</Button>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HomePage;
