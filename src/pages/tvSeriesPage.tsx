import React, { useState } from "react";
import TVSeriesListPageTemplate from "../components/templateTVSeriesListPage";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { DiscoverTVSeries } from "../types/interfaces";
import Pagination from "../Pagination";

const TVSeriesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>(
    ["discoverTV", currentPage],
    () => getTVSeries(currentPage),
    { keepPreviousData: true, staleTime: 5000 }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TVSeriesListPageTemplate
        title="Discover TV Series"
        series={tvSeries}
        action={() => null} 
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TVSeriesPage;