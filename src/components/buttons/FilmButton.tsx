import { Button } from '@mui/material'
import { useNavigate } from 'react-router'

interface ButtonProps{
  movie: Movie
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const FilmButton = ({movie}: ButtonProps) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/single-movie/${movie.title}`,{state:movie})
  }
  return (
    <Button sx={{maxWidth:'200px'}} variant='contained' onClick={handleNavigate}>
    review
  </Button>
  )
}

export default FilmButton