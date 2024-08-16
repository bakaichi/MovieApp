import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { SeriesContext } from "../../contexts/tvSeriesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps, BaseTVSeriesProps } from "../../types/interfaces";

interface AddToFavouritesIconProps {
  item: BaseMovieProps | BaseTVSeriesProps;
  isMovie: boolean;
}

const AddToFavouritesIcon: React.FC<AddToFavouritesIconProps> = ({ item, isMovie }) => {
  const movieContext = useContext(MoviesContext);
  const seriesContext = useContext(SeriesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMovie) {
      movieContext.addToFavourites(item as BaseMovieProps);
    } else {
      seriesContext.addToFavourites(item as BaseTVSeriesProps);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
