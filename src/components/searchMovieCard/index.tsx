import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { searchMovies } from '../../api/tmdb-api';
import Spinner from '../spinner';
import { DiscoverMovies, BaseMovieProps } from '../../types/interfaces';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const styles = {
  formControl: {
    margin: '10px',
    minWidth: '120px',
  },
  searchButton: {
    margin: '20px 0',
  },
};

const SearchMoviesCard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(0);
  const [releaseYear, setReleaseYear] = useState('');
  const [searchParams, setSearchParams] = useState<{ title?: string; genre?: number; releaseYear?: string }>({});
  
  const { data, error, isLoading, isError, refetch } = useQuery<DiscoverMovies, Error>(
    ['searchMovies', searchParams],
    () => searchMovies(searchParams),
    {
      enabled: false, // Don't fetch on mount
    }
  );

  const handleSearch = () => {
    setSearchParams({ title, genre, releaseYear });
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <form>
        <FormControl sx={styles.formControl}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        
        <FormControl
          sx={styles.formControl}
        >
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            onChange={(e) => setGenre(Number(e.target.value))}
            MenuProps={{
              disablePortal: true, // render dropdown
              MenuListProps: {
                onClick: (event) => event.stopPropagation(), // prevent the form from closing when interacting with the dropdown
              },
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={28}>Action</MenuItem>
            <MenuItem value={12}>Adventure</MenuItem>
            <MenuItem value={16}>Animation</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={styles.formControl}>
          <TextField
            label="Release Year"
            variant="outlined"
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </FormControl>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch} 
          sx={styles.searchButton}
        >
          Search
        </Button>
      </form>

      <div>
        {data && data.results.length > 0 ? (
            <ul>
            {data.results.slice(0, 10).map((movie: BaseMovieProps) => (  // limit the results to 10 
                <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
            </ul>
        ) : (
            <p>No results found</p>
        )}
        </div>
    </div>
  );
};

export default SearchMoviesCard;
