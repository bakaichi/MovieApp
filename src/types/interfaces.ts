  export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }  

  export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      id: number;
      name: string;
    }[];
  }

  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }

  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }

  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface DiscoverTVSeries {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseTVSeriesProps[];
  }

  export interface TVSeriesDetailsProps extends BaseTVSeriesProps {
    genres: {
      id: number;
      name: string;
    }[];
    seasons: {
      season_number: number;
      episode_count: number;
    }[];
    number_of_seasons: number;
    number_of_episodes: number;
    homepage: string;
    favorite?: boolean;
  }

  export interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }

  export interface BaseTVSeriesProps {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    first_air_date: string;
    genre_ids?: number[];
    origin_country: string[];
  }

  export interface BaseTVSeriesListProps {
    series: BaseTVSeriesProps[];
    action: (s: BaseTVSeriesProps) => React.ReactNode;
    title?: string; 
  }

  export type FilterOption = "title" | "genre" | "releaseYear" | "sortOrder";
    
  export interface Filter {
      name: string;
      value: string;
      condition: (item: any, value: string) => boolean;
      sort?: (a: any, b: any, order: string) => number; // New sort method
  }

  export interface MovieFilterUIProps {
    onFilterValuesChange: (f: FilterOption, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    releaseYearFilter: string; 
    sortOrder: string;         
  }
  
  // Interface for TVSeriesFilterUI props
  export interface TVSeriesFilterUIProps {
    onFilterValuesChange: (f: FilterOption, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    releaseYearFilter: string; // New
    sortOrder: string;         // New
  }

  export interface CastMember {
    name: string;
    role: string;
    description: string;
  }

  export interface FantasyMovieProps {
    image: string;
    title: string;
    overview: string;
    genres: string[];
    releaseDate: string;
    runtime: string;
    productionCompanies: string[];
    cast: CastMember[];  
  }