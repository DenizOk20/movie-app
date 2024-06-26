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
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
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
                navigate(`/movie/${newValue}`)
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
