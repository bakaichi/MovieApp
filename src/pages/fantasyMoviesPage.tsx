import React, { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, Fab } from "@mui/material";
import FantasyMovieForm from "../components/fantasyMovieForm";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import AddIcon from '@mui/icons-material/Add';
import TemplateFantasyMoviesListPage from "../components/templateFantasyMovieListPage";

const FantasyMoviesPage: React.FC = () => {
  const { movies } = useContext(FantasyMoviesContext); 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TemplateFantasyMoviesListPage
        title="Discover Fantasy Movies"
        movies={movies}
      />

      <Fab
        color="primary"
        variant="extended"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          top: "18vh",
          right: "11vh",
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Fantasy Movie
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Fantasy Movie</DialogTitle>
        <DialogContent>
          <FantasyMovieForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FantasyMoviesPage;
