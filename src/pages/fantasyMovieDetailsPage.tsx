import React from "react"; 
import { useParams } from "react-router-dom";
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import TemplateFantasyMoviePage from "../components/templateFantasyMoviePage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";

const FantasyMovieDetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { movies } = React.useContext(FantasyMoviesContext);

  const movie = movies.find((m) => m.title === title);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <TemplateFantasyMoviePage movie={movie}>
      <FantasyMovieDetails {...movie} />
    </TemplateFantasyMoviePage>
  );
};

export default FantasyMovieDetailsPage;
