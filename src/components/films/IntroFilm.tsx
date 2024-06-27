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
        // height: {xs: 'calc(100vh - 64px)', md:'calc(100vh - 68.5px)'},
        // backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
      >
      <Box component="img" 
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        sx={{objectFit:'cover',
          width:'50%',
          height: {xs: 'calc(100vh - 64px)', md:'calc(100vh - 68.5px)'},
          padding:'8px 20px',
        }}
      />
      <Container
        sx={{
          maxWidth:{md:'450px',lg:'500px',xl:'650px'},
          zIndex: 1,
          color:'black',
          height: {xs: 'calc(100vh - 64px)', md:'calc(100vh - 68.5px)'},
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-evenly',
          padding:'20px 0',
          textAlign:'left'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{
          fontSize: {xs: '1.8rem',sm:'2rem',md:'3.8rem'},
        }}>
          {movie?.title}
        </Typography>
        <Typography variant="h5" sx={{
          fontSize: {xs: '1rem',sm:'1.1rem',md:'1.4rem'}
        }}>
          {movie?.overview}
        </Typography>
        {movie && <FilmButton movie={movie}/>}
      </Container>
    </Box>
  )
}

export default IntroFilm