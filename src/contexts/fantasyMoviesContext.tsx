import React, { createContext, useState, ReactNode } from 'react';
import { FantasyMovieProps } from '../types/interfaces';

interface FantasyMoviesContextProps {
  movies: FantasyMovieProps[];
  addMovie: (movie: FantasyMovieProps) => void;
}

export const FantasyMoviesContext = createContext<FantasyMoviesContextProps>({
  movies: [],
  addMovie: () => {},
});

export const FantasyMoviesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<FantasyMovieProps[]>([]);

  const addMovie = (movie: FantasyMovieProps) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <FantasyMoviesContext.Provider value={{ movies, addMovie }}>
      {children}
    </FantasyMoviesContext.Provider>
  );
};