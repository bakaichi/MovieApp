import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { MovieFilterUIProps } from "../../types/interfaces";
import { BaseMovieProps } from "../../types/interfaces";

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

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().includes(value.toLowerCase());
  };
  
  export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
    const genreId = Number(value);
    return genreId === 0 || (movie.genre_ids?.includes(genreId) ?? false);
  };
  export const releaseYearFilter = (movie: BaseMovieProps, value: string): boolean => {
    if (!value) return true;
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 0;
    return releaseYear === parseInt(value, 10);
  };
  
  export const releaseYearSort = (a: BaseMovieProps, b: BaseMovieProps, order: string): number => {
    const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0;
    const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0;
    return order === "asc" ? yearA - yearB : yearB - yearA;
  };
  
    const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
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
export default MovieFilterUI;