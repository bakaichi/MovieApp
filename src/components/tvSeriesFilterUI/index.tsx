import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { TVSeriesFilterUIProps } from "../../types/interfaces";
import { BaseTVSeriesProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

export const titleFilter = (series: BaseTVSeriesProps, value: string): boolean => {
  return series.name.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (series: BaseTVSeriesProps, value: string): boolean => {
  const genreId = Number(value);
  return genreId === 0 || (series.genre_ids?.includes(genreId) ?? false);
};

export const releaseYearFilter = (series: BaseTVSeriesProps, value: string): boolean => {
  if (!value) return true;
  const releaseYear = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 0;
  return releaseYear === parseInt(value, 10);
};

export const releaseYearSort = (a: BaseTVSeriesProps, b: BaseTVSeriesProps, order: string): number => {
  const yearA = a.first_air_date ? new Date(a.first_air_date).getFullYear() : 0;
  const yearB = b.first_air_date ? new Date(b.first_air_date).getFullYear() : 0;
  return order === "asc" ? yearA - yearB : yearB - yearA;
};

const TVSeriesFilterUI: React.FC<TVSeriesFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  releaseYearFilter,
  sortOrder
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          releaseYearFilter={releaseYearFilter} // New
          sortOrder={sortOrder}                 // New
        />
      </Drawer>
    </>
  );
};

export default TVSeriesFilterUI;
