import { Autocomplete, Box, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RatedMovies from "../films/RatedMovies";
import PopularMovies from "../films/PopularMovies";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
}

const SearchMovie = () => {
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response1 = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data1 = await response1.json();
      setMovies(data1.results);
  
      const response2 = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data2 = await response2.json();
  
      setMovies((prevMovies) => {
        if (!prevMovies) {
          prevMovies = [];
        }
        const newMovies = data2.results.filter(
          (movie: Movie) => !prevMovies.some((prevMovie: Movie) => prevMovie.title === movie.title)
        );
        return [...prevMovies, ...newMovies];
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
      <Container
        sx={{
          backgroundColor: "#c5c5c5",
          minWidth: "100%",
          display:'flex',
          flexDirection: 'column',
          justifyContent:'center',
          padding: {xs:'0',md:'0', lg: '0',xl:'0'}
        }}
      >
        <Autocomplete
            sx={{
                minWidth:'500px',
                padding:'20px 0',
                textAlign: 'center'
            }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={[
            ...movies?.map((movie) => movie.title) || [],
            `For More ${inputValue}`,
          ]}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue === `For More ${inputValue}`) {
              navigate(`/search/movie-list?title=${inputValue}`);
            }else{
              const selectedMovie = movies?.find(movie => movie.title === newValue);
              if (selectedMovie) {
                navigate(`/single-movie/${selectedMovie.title}`, { state: selectedMovie });
              }
            }
          }}
          renderInput={(params) => (
            <TextField
            sx={{
                border: 'none',
                backgroundColor: 'white',
                maxWidth:'500px',
            }}
              {...params}
              label="Search Movie"
              InputLabelProps={{
                style:{color:'black',border:'none',outline:'none'}
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Box>
          <RatedMovies/>
          <PopularMovies/>
          <Typography sx={{
            padding:'12px 12px 20px',
            backgroundColor:'#005C78',
            textAlign:'center',
            fontSize:'1.5rem',
          }}>
            <Link to="/search/movie-list"
                style={{border:'1px solid white',padding:'6px'}}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >For more Result</Link>
          </Typography>
        </Box>
      </Container>
  );
};

export default SearchMovie;
