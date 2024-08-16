import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BaseMovieProps, BaseTVSeriesProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

interface WriteReviewIconProps {
  item: BaseMovieProps | BaseTVSeriesProps;
  isMovie: boolean;
}

const WriteReviewIcon: React.FC<WriteReviewIconProps> = ({ item, isMovie }) => {
  return (
    <Link
      to={'/reviews/form'}
      state={{
        movieId: isMovie ? (item as BaseMovieProps).id : (item as BaseTVSeriesProps).id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
