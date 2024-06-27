import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilmButton from '../buttons/FilmButton';

interface Movie{
  id: number,
  title: string,
  overview: string,
  poster_path: string,
}

const IntroFilm = () => {

  const [movie, setMovie] = useState<Movie | null>(null);
  
  const getShows = async () => {
    try {
        await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`)
        .then(res => res.json())
        .then(json => setMovie(json.results[0]))
    } catch (error) {
        console.error(error)
    }
}

useEffect(() => {
    getShows()
},[])

console.log(movie)

  return (
    <Box
    
      sx={{
        position: 'relative',
        width: '100%',
        height: {xs: 'calc(100vh - 64px)', md:'calc(100vh - 68.5px)'},
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        objectFit: 'fill',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <Container
        sx={{
          position: 'absolute',
          left: '0',
          bottom: {xs:'70px',sm:'70px',md:'30px',lg:'70px'},
          maxWidth:{md:'450px',lg:'500px',xl:'650px'},
          zIndex: 1,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{
          fontSize: {xs: '1.8rem',sm:'2rem',md:'2.8rem'}
        }}>
          {movie?.title}
        </Typography>
        <Typography variant="h5" sx={{
          fontSize: {xs: '1rem',sm:'1.1rem',md:'1.2rem'}
        }}>
          {movie?.overview}
        </Typography>
      </Container>
      <Container
        sx={{
          maxWidth: {xl: '200px',lg:'200px',md:'200px'},
          position: 'absolute',
          right: '40',
          bottom: {xs:'30px', md: '70px'},
          zIndex: 1,
        }}
      >
       {movie && <FilmButton movie={movie}/>}
      </Container>
    </Box>
  )
}

export default IntroFilm