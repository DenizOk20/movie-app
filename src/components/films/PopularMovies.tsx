import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilmButton from '../buttons/FilmButton';


interface Movie{
  id: number,
  title: string,
  overview: string,
  poster_path: string,
}

const PopularMovies = () => {

  const [movies, setMovies] = useState<Movie[] | null>([]);
  
  const getShows = async () => {
    try {
        await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`)
        .then(res => res.json())
        .then(json => setMovies(json.results))
    } catch (error) {
        console.error(error)
    }
}

useEffect(() => {
    getShows()
},[])

console.log(movies)

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
        <Typography variant='h3' component="h3" sx={{
            backgroundColor: '#005C78',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '16px 20px',
            fontSize: '2rem',
        }}>
            Popular
        </Typography>
    <Container sx={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        backgroundColor: '#005C78',
        minWidth: '100%'
    }}>
     {movies?.slice(0,6).map(movie => (
        <Box sx={{
            position:'relative',
            width:'350px',
            height: '500px',
            cursor: 'pointer',
            '&:hover .hoverButton':{opacity:1},
            '&:hover':{opacity:0.8},
        }}>
            <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto', 
                  maxHeight:'400px',
                }}
                alt="Descriptive alt text"
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            />
            <Typography variant='h6' component="h6" sx={{}}>
                {movie.title}
            </Typography>
            <Box
              className="hoverButton"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
            >
            <FilmButton/>
            </Box>
        </Box>
     )
     )}
    </Container>
    </Box>
  )
}

export default PopularMovies