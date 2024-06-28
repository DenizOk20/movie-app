import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
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
        textAlign: 'center',
      }}
    >
        <Typography variant='h3' component="h3" sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '8px 20px 20px',
            fontSize: '2rem',
            gap:'4px'
        }}>
            Popular
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="#000000"><rect fill="none" height="20" width="20"/><path d="M16.44,15.38C16.79,14.84,17,14.19,17,13.5c0-1.93-1.57-3.5-3.5-3.5S10,11.57,10,13.5s1.57,3.5,3.5,3.5 c0.69,0,1.34-0.21,1.88-0.56L17.94,19L19,17.94L16.44,15.38z M13.5,15.5c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S14.6,15.5,13.5,15.5z M17.78,2L19,2.87l-3.88,5.9h0C14.61,8.59,14.07,8.5,13.5,8.5L17.78,2z M13.5,8.5c-0.58,0-1.13,0.1-1.65,0.28l0,0l-0.78-1.1 l-3.41,5.36l-2.48-2.97l-2.96,4.81L1,14l4-6.5l2.5,3L11,5L13.5,8.5z"/></svg>
            </span>
        </Typography>
    <Container sx={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
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
                alt="movie"
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

export default PopularMovies