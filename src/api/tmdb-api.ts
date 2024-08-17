export const getMovies = async (page: number = 1) => {
  return fetch(
      // @ts-ignore
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
    throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
      // @ts-ignore
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
  export const getGenres = () => {
    return fetch(
        // @ts-ignore
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getUpcomingMovies = () => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getSimilarMovies = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch similar movies. Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => json.results)
      .catch((error) => {
        throw error;
      });
  };
  
  export const getTVSeries = async (page: number = 1) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch TV series. Response status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getTVSeriesDetails = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to get TV series details. Response status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  
  export const getSimilarTVSeries = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch similar TV series. Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => json.results)
      .catch((error) => {
        throw error;
      });
  };
  
  export const getTVSeriesActors = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch TV series actors. Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => json.cast)
      .catch((error) => {
        throw error;
      });
  };

  export const getTVSeriesImages = (id: string | number) => {
    return fetch(
        // @ts-ignore
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch TV series images");
        }
        return response.json();
      })
      .then((json) => json.posters) // Return the posters array
      .catch((error) => {
        throw error;
      });
  };

  export const searchMovies = async (searchParams: { title?: string; genre?: number; releaseYear?: string }) => {
    const { title, genre, releaseYear } = searchParams;
    const query = new URLSearchParams();
  
    if (title) query.append("query", title);
    if (genre) query.append("with_genres", genre.toString());
    if (releaseYear) query.append("year", releaseYear);
  
      // @ts-ignore
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&${query.toString()}`;
  
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  };
  