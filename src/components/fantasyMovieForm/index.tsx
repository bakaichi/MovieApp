import React, { useState, useContext } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import { FantasyMovieProps } from "../../types/interfaces";

const styles = {
  formControl: {
    margin: '10px',
    minWidth: '120px',
  },
  button: {
    marginTop: '20px',
  },
};

const FantasyMovieForm: React.FC = () => {
  const { addMovie } = useContext(FantasyMoviesContext);

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [runtime, setRuntime] = useState('');
  const [productionCompanies, setProductionCompanies] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);  // img as string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fantasyMovie: FantasyMovieProps = {
      title,
      overview,
      genres,
      releaseDate,
      runtime,
      productionCompanies,
      image: image || "", 
    };
    addMovie(fantasyMovie);
    setTitle('');
    setOverview('');
    setGenres([]);
    setReleaseDate('');
    setRuntime('');
    setProductionCompanies([]);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={styles.formControl}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <TextField
          label="Overview"
          variant="outlined"
          multiline
          rows={4}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          required
        />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <InputLabel>Genres</InputLabel>
        <Select
          multiple
          value={genres}
          onChange={(e) => setGenres(e.target.value as string[])}
        >
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value= "Animation"> Animation </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={styles.formControl}>
        <TextField
          label="Release Date"
          variant="outlined"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <TextField
          label="Runtime (minutes)"
          variant="outlined"
          type="number"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
          required
        />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <InputLabel>Production Companies</InputLabel>
        <Select
          multiple
          value={productionCompanies}
          onChange={(e) => setProductionCompanies(e.target.value as string[])}
        >
          <MenuItem value="Company A">Company A</MenuItem>
          <MenuItem value="Company B">Company B</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Button
          variant="contained"
          component="label"
          color="primary"
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageUpload}
            accept="image/*"
          />
        </Button>
        {image && <img src={image} alt="Preview" style={{ marginTop: '10px', maxHeight: '100px' }} />}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={styles.button}
      >
        Create Fantasy Movie
      </Button>
    </form>
  );
};

export default FantasyMovieForm;
