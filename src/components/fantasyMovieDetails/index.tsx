import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import { FantasyMovieProps } from "../../types/interfaces";
import Grid from "@mui/material/Grid";

const styles = {
    container: {
        padding: "20px",
    },
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    castContainer: {
        marginTop: "20px",
    },
    castMember: {
        marginBottom: "10px",
    },
};

const FantasyMovieDetails: React.FC<FantasyMovieProps> = (movie) => {
    return (
        <Paper sx={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h3">
                        Overview
                    </Typography>
                    <Typography variant="h6" component="p">
                        {movie.overview}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper component="ul" sx={styles.chipSet}>
                        <li>
                            <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                        </li>
                        {movie.genres.map((g) => (
                            <li key={g}>
                                <Chip label={g} />
                            </li>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component="ul" sx={styles.chipSet}>
                        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                        <Chip label={`Released: ${movie.releaseDate}`} />
                        {movie.productionCompanies.map((company, index) => (
                            <Chip key={index} label={`Produced by: ${company}`} />
                        ))}
                    </Paper>
                </Grid>

                {movie.cast && movie.cast.length > 0 && (
                    <Grid item xs={12}>
                        <div style={styles.castContainer}>
                            <Typography variant="h5" component="h3">
                                Cast
                            </Typography>
                            {movie.cast.map((member, index) => (
                                <div key={index} style={styles.castMember}>
                                    <Typography variant="h6" component="p">
                                        {member.name} - {member.role}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        {member.description}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default FantasyMovieDetails;
