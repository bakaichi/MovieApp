import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TVSeriesPage from "./pages/tvSeriesPage";
import TVSeriesDetailsPage from "./pages/tvSeriesDetailsPage";
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './contexts/authContext';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import SeriesContextProvider from "./contexts/tvSeriesContext";
import FavouriteTVSeriesPage from "./pages/favoriteTVSeriesPage";
import FantasyMoviesPage from "./pages/fantasyMoviesPage";
import { FantasyMoviesProvider } from "./contexts/fantasyMoviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <SiteHeader />
            <MoviesContextProvider>
              <SeriesContextProvider>
                <FantasyMoviesProvider>
                    <Routes>
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          
                          {/* The following routes are all protected by PrivateRoute */}
                          <Route path="/" element={<PrivateRoute component={HomePage} />} />
                          <Route path="/movies/favourites" element={<PrivateRoute component={FavouriteMoviesPage} />} />
                          <Route path="/movies/:id" element={<PrivateRoute component={MoviePage} />} />
                          <Route path="/reviews/:id" element={<PrivateRoute component={MovieReviewPage} />} />
                          <Route path="/movies/upcoming" element={<PrivateRoute component={UpcomingMoviesPage} />} />
                          <Route path="/reviews/form" element={<PrivateRoute component={AddMovieReviewPage} />} />
                          <Route path="/tv-series" element={<PrivateRoute component={TVSeriesPage} />} />
                          <Route path="/tv-series/:id" element={<PrivateRoute component={TVSeriesDetailsPage} />} />
                          <Route path="/tv-series/favourites" element={<PrivateRoute component={FavouriteTVSeriesPage} />} />
                          <Route path="/fantasy-movies" element={<PrivateRoute component={FantasyMoviesPage} />} />
                          {/* redirect unknown paths to home or login */}
                          <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                  </FantasyMoviesProvider>
              </SeriesContextProvider>  
            </MoviesContextProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
