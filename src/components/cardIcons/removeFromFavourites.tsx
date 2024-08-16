import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { SeriesContext } from "../../contexts/tvSeriesContext";
import { BaseMovieProps, BaseTVSeriesProps } from "../../types/interfaces";

interface RemoveFromFavouritesIconProps {
  item: BaseMovieProps | BaseTVSeriesProps;
  isMovie: boolean;
}

const RemoveFromFavouritesIcon: React.FC<RemoveFromFavouritesIconProps> = ({ item, isMovie }) => {
  const movieContext = useContext(MoviesContext);
  const seriesContext = useContext(SeriesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMovie) {
      movieContext.removeFromFavourites(item as BaseMovieProps);
    } else {
      seriesContext.removeFromFavourites(item as BaseTVSeriesProps);
    }
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;
