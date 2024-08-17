import React, { useState, useContext } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material";
import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import { FantasyMovieProps, CastMember } from "../../types/interfaces";

const FantasyMovieForm: React.FC = () => {
  const { addMovie } = useContext(FantasyMoviesContext);

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [runtime, setRuntime] = useState('');
  const [productionCompanies, setProductionCompanies] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const [cast, setCast] = useState<CastMember[]>([]);
  const [castMemberName, setCastMemberName] = useState('');
  const [castMemberRole, setCastMemberRole] = useState('');
  const [castMemberDescription, setCastMemberDescription] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCastMember = () => {
    if (castMemberName && castMemberRole && castMemberDescription) {
      const newCastMember: CastMember = {
        name: castMemberName,
        role: castMemberRole,
        description: castMemberDescription,
      };
      setCast([...cast, newCastMember]);
      setCastMemberName('');
      setCastMemberRole('');
      setCastMemberDescription('');
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
      cast,
    };
    addMovie(fantasyMovie);
    setTitle('');
    setOverview('');
    setGenres([]);
    setReleaseDate('');
    setRuntime('');
    setProductionCompanies([]);
    setImage(null);
    setCast([]);
  };

  // disable add cast member button if cast info is empty 
  const isAddCastMemberDisabled = !castMemberName || !castMemberRole || !castMemberDescription;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Runtime (minutes)"
            variant="outlined"
            type="number"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Genres</InputLabel>
            <Select
              multiple
              value={genres}
              onChange={(e) => setGenres(e.target.value as string[])}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Animation">Animation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Overview"
            variant="outlined"
            multiline
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Add Cast Members</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Name"
            variant="outlined"
            value={castMemberName}
            onChange={(e) => setCastMemberName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={castMemberRole}
              onChange={(e) => setCastMemberRole(e.target.value as string)}
            >
              <MenuItem value="Producer">Producer</MenuItem>
              <MenuItem value="Main Character">Main Character</MenuItem>
              <MenuItem value="Supporting Character">Supporting Character</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="Writer">Writer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Description"
            variant="outlined"
            value={castMemberDescription}
            onChange={(e) => setCastMemberDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCastMember}
            disabled={isAddCastMemberDisabled}
          >
            Add Cast Member
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ul>
            {cast.map((member, index) => (
              <li key={index}>
                {member.name} - {member.role}: {member.description}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        Create Fantasy Movie
      </Button>
    </form>
  );
};

export default FantasyMovieForm;
