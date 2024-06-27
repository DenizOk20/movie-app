import {
  Box,
  Pagination,
  Typography,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilmButton from "../buttons/FilmButton";
import usePagination from "../pagination/Pagination";
import SearchIcon from "@mui/icons-material/Search";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movies[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const PER_PAGE = 6;

  const AllMovies = usePagination({
    data: filteredMovies,
    itemsPerPage: PER_PAGE,
  });

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    AllMovies.jump(p);
    window.scrollTo(0, 0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getMovies = async () => {
    try {
      const response1 = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data1 = await response1.json();
      const movies1 = data1.results;

      const response2 = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data2 = await response2.json();
      const movies2 = data2.results;

      const combinedMovies = [
        ...movies1,
        ...movies2.filter(
          (movie: Movies) =>
            !movies1.some(
              (prevMovie: Movies) => prevMovie.title === movie.title
            )
        ),
      ];
      setMovies(combinedMovies);
      setFilteredMovies(combinedMovies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  const count = Math.ceil(filteredMovies.length / PER_PAGE);

  return (
    <div style={{ padding: "20px" }}>
      <Box display="flex" alignItems="center" gap="10px">
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ maxWidth:'300px'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />
      </Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: "3rem",
          padding: "20px 0",
          display:'flex',
          alignItems:'center',
          gap:'10px',
        }}
      >
        All Movies
        <span style={{marginTop:'4px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#5f6368"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 10v8l7-4zm12-4h-7.58l3.29-3.29L16 2l-4 4h-.03l-4-4-.69.71L10.56 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12z"/></svg>
        </span>
      </Typography>

      {filteredMovies.length === 0 ? (
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: "center", margin: "20px 0" }}
        >
          No movies found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {AllMovies.currentData().map((movie) => (
            <Box
              key={movie.id}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                  lg: "row",
                  xxl: "row",
                },
                gap: "20px",
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt="movie"
                sx={{
                  maxWidth: "350px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography variant="h4" component="h4">
                  {movie.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ maxWidth: "400px" }}
                >
                  {movie.overview}
                </Typography>
                <Typography>
                  <FilmButton movie={movie} />
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
        }}
        count={count}
        size={isSmallScreen ? "small" : "large"}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
};

export default MovieList;
