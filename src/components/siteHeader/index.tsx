import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/authContext";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Use useAuth for auth state
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [favoritesAnchorEl, setFavoritesAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Tv-Series", path: "/tv-series" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Fantasy Movies", path: "/fantasy-movies" },
  ];

  const favoritesOptions = [
    { label: "Favorite Movies", path: "/movies/favourites" },
    { label: "Favorite Series", path: "/tv-series/favourites" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null); // Close the menu after selecting an option
  };

  const handleFavoritesOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setFavoritesAnchorEl(event.currentTarget);
  };

  const handleFavoritesClose = () => {
    setFavoritesAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {isAuthenticated ? (
                  <>
                    {menuOptions.map((opt) => (
                      <MenuItem
                        key={opt.label}
                        onClick={() => handleMenuSelect(opt.path)}
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleMenuSelect("/login")}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/register")}>
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  {menuOptions.map((opt) => (
                    <Button
                      key={opt.label}
                      color="inherit"
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                  <Button
                    color="inherit"
                    aria-controls={favoritesAnchorEl ? "favorites-menu" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleFavoritesOpen}
                    onClick={handleFavoritesOpen}
                  >
                    Favorites
                  </Button>
                  <Menu
                    id="favorites-menu"
                    anchorEl={favoritesAnchorEl}
                    open={Boolean(favoritesAnchorEl)}
                    onClose={handleFavoritesClose}
                    MenuListProps={{
                      onMouseLeave: handleFavoritesClose,
                    }}
                  >
                    {favoritesOptions.map((opt) => (
                      <MenuItem
                        key={opt.label}
                        onClick={() => handleMenuSelect(opt.path)}
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => handleMenuSelect("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => handleMenuSelect("/register")}>
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
