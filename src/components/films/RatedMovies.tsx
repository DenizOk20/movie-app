import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilmButton from '../buttons/FilmButton';


interface Movie{
  id: number,
  title: string,
  overview: string,
  poster_path: string,
}

const RatedMovies = () => {

  const [movies, setMovies] = useState<Movie[] | null>([]);
  
  const getShows = async () => {
    try {
        await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`)
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
        // color: 'white',
        textAlign: 'center',
      }}
    >
        <Typography variant='h3' component="h3" sx={{
            // backgroundColor: '#3e99b5',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '20px',
            fontSize: '2rem',
        }}>
            Top Rated
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="#de843b"><g><rect fill="none" height="20" width="20" x="0"/></g><g><path d="M16,11c0.01-2.39-1.2-4.96-3-6l-0.33,0.41c-0.31,0.39-0.74,0.57-1.16,0.57c-0.77,0-1.51-0.59-1.51-1.5V2c0,0-6,3.75-6,9 c0,3.31,2.69,6,6,6S16,14.31,16,11L16,11z M10,15.5c-0.73,0-1.5-0.58-1.5-1.5c0-0.47,0.21-0.8,0.39-1L10,11.75L11.11,13 c0.18,0.2,0.39,0.53,0.39,1C11.5,14.83,10.83,15.5,10,15.5z M12.96,14.37L12.96,14.37c0.03-0.25,0.19-1.35-0.73-2.37L10,9.5 L7.77,12c-0.92,1.02-0.76,2.12-0.73,2.36C6.1,13.53,5.5,12.34,5.5,11c0-2.41,1.62-4.52,3.06-5.92c0.28,1.37,1.5,2.39,2.95,2.39 c0.57,0,1.11-0.16,1.58-0.46c0.85,0.99,1.41,2.55,1.41,3.98C14.5,12.34,13.9,13.55,12.96,14.37z"/></g></svg>
            </span>
        </Typography>
    <Container sx={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        // backgroundColor: '#3e99b5',
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
                position: {md:'absolute'},
                top: {md:'50%'},
                left:{md:'50%'},
                transform: {md:'translate(-50%, -50%)'},
                opacity: { xs: 1, sm: 1, md: 0 },
                transition: 'opacity 0.3s',
              }}
            >
            <FilmButton movie={movie}/>
            </Box>
        </Box>
     )
     )}
    </Container>
    </Box>
  )
}

export default RatedMovies